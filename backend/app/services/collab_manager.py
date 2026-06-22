import logging
from typing import Dict, List, Any, Set
from fastapi import WebSocket

logger = logging.getLogger("cine_station_pro")

class CollabManager:
    def __init__(self):
        # active_sessions maps session_id to session details:
        # {
        #   "project_id": str,
        #   "host": str,
        #   "connections": Dict[str, WebSocket],  # maps user_id -> WebSocket
        #   "locked_clips": Dict[str, str]        # maps clip_id -> user_id (who locked it)
        # }
        self.active_sessions: Dict[str, Dict[str, Any]] = {}
        logger.info("CollabManager service initialized")

    def create_session(self, project_id: str, host_user: str) -> str:
        """
        Creates a new collaboration session room and returns the session_id.
        """
        # Session ID is tied to the project or is a unique room token
        session_id = f"session_{project_id}"
        if session_id not in self.active_sessions:
            self.active_sessions[session_id] = {
                "project_id": project_id,
                "host": host_user,
                "connections": {},
                "locked_clips": {}
            }
            logger.info(f"Collab session '{session_id}' created by host '{host_user}' for project '{project_id}'")
        return session_id

    async def join_session(self, session_id: str, user_id: str, websocket: WebSocket) -> bool:
        """
        Registers a new WebSocket connection under the specified session room.
        """
        if session_id not in self.active_sessions:
            logger.error(f"Cannot join session: Session room '{session_id}' does not exist.")
            return False

        # Add socket connection
        self.active_sessions[session_id]["connections"][user_id] = websocket
        logger.info(f"User '{user_id}' joined collaboration session '{session_id}'")
        
        # Broadcast user joined event to other peers in the room
        await self.broadcast(session_id, {
            "type": "user_joined",
            "user_id": user_id,
            "message": f"User {user_id} joined the room."
        }, exclude_user=user_id)
        
        # Send current lock status state to the newly joined user
        await websocket.send_json({
            "type": "sync_state",
            "locked_clips": self.active_sessions[session_id]["locked_clips"]
        })
        return True

    async def disconnect_user(self, session_id: str, user_id: str) -> None:
        """
        Cleans up user socket connection and unlocks any clips they had locked.
        """
        if session_id not in self.active_sessions:
            return

        session = self.active_sessions[session_id]
        if user_id in session["connections"]:
            del session["connections"][user_id]
            logger.info(f"User '{user_id}' disconnected from session '{session_id}'")

        # Unlock any clips owned by this user
        unlocked_clips = []
        for clip_id, owner_id in list(session["locked_clips"].items()):
            if owner_id == user_id:
                del session["locked_clips"][clip_id]
                unlocked_clips.append(clip_id)

        # Notify peers about disconnection and unlocks
        await self.broadcast(session_id, {
            "type": "user_left",
            "user_id": user_id,
            "unlocked_clips": unlocked_clips
        })

        # Close session room entirely if empty
        if not session["connections"]:
            del self.active_sessions[session_id]
            logger.info(f"Collab session '{session_id}' closed (no active users remaining).")

    async def lock_clip(self, session_id: str, clip_id: str, user_id: str) -> bool:
        """
        Locks a clip exclusively for edit by a specific user.
        Returns True if lock is granted or already held by the user.
        """
        if session_id not in self.active_sessions:
            return False

        session = self.active_sessions[session_id]
        current_owner = session["locked_clips"].get(clip_id)

        if current_owner is None:
            session["locked_clips"][clip_id] = user_id
            logger.info(f"Clip '{clip_id}' locked by user '{user_id}' in session '{session_id}'")
            await self.broadcast(session_id, {
                "type": "clip_locked",
                "clip_id": clip_id,
                "user_id": user_id
            })
            return True
        elif current_owner == user_id:
            return True

        logger.warning(f"Lock denied: Clip '{clip_id}' is already locked by user '{current_owner}'")
        return False

    async def unlock_clip(self, session_id: str, clip_id: str) -> bool:
        """
        Unlocks a previously locked clip, broadcasting the release state.
        """
        if session_id not in self.active_sessions:
            return False

        session = self.active_sessions[session_id]
        if clip_id in session["locked_clips"]:
            owner_id = session["locked_clips"][clip_id]
            del session["locked_clips"][clip_id]
            logger.info(f"Clip '{clip_id}' unlocked in session '{session_id}'")
            await self.broadcast(session_id, {
                "type": "clip_unlocked",
                "clip_id": clip_id,
                "owner_id": owner_id
            })
            return True
        return False

    async def broadcast_edit(self, session_id: str, editor_user: str, edit_data: Dict[str, Any]) -> None:
        """
        Broadcasts timeline changes (additions, moves, deletions) to all active room peers.
        """
        logger.info(f"Broadcasting edit from '{editor_user}' in session '{session_id}'")
        await self.broadcast(session_id, {
            "type": "timeline_edit",
            "user_id": editor_user,
            "edit_data": edit_data
        }, exclude_user=editor_user)

    async def send_chat_message(self, session_id: str, sender_user: str, message: str) -> None:
        """
        Broadcasts a text chat message to all peers.
        """
        logger.info(f"Broadcasting chat message from '{sender_user}' in session '{session_id}'")
        await self.broadcast(session_id, {
            "type": "chat_message",
            "user_id": sender_user,
            "message": message
        })

    async def broadcast(self, session_id: str, payload: Dict[str, Any], exclude_user: str = None) -> None:
        """
        Helper method to transmit a JSON packet to all socket connections in a session room.
        """
        if session_id not in self.active_sessions:
            return

        connections = self.active_sessions[session_id]["connections"]
        for user_id, socket in list(connections.items()):
            if exclude_user and user_id == exclude_user:
                continue
            try:
                await socket.send_json(payload)
            except Exception as e:
                logger.error(f"Failed to send JSON packet to user '{user_id}': {e}. Disconnecting user.")
                # Clean up stale connection
                await self.disconnect_user(session_id, user_id)
