from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status
from app.services.collab_manager import CollabManager
import logging

router = APIRouter()
collab_manager = CollabManager()
logger = logging.getLogger("cine_station_pro")

@router.websocket("/ws/collab/{session_id}")
async def websocket_collab(websocket: WebSocket, session_id: str, user_id: str):
    """
    WebSocket endpoint connecting client editors to live collaborative session rooms.
    """
    await websocket.accept()
    
    # Establish connection mapping
    joined = await collab_manager.join_session(session_id, user_id, websocket)
    if not joined:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
        
    try:
        while True:
            # Read incoming JSON commands
            data = await websocket.receive_json()
            msg_type = data.get("type")
            
            if msg_type == "lock_clip":
                clip_id = data.get("clip_id")
                if clip_id:
                    await collab_manager.lock_clip(session_id, clip_id, user_id)
            elif msg_type == "unlock_clip":
                clip_id = data.get("clip_id")
                if clip_id:
                    await collab_manager.unlock_clip(session_id, clip_id)
            elif msg_type == "timeline_edit":
                edit_data = data.get("edit_data")
                if edit_data:
                    await collab_manager.broadcast_edit(session_id, user_id, edit_data)
            elif msg_type == "chat_message":
                message = data.get("message")
                if message:
                    await collab_manager.send_chat_message(session_id, user_id, message)
                    
    except WebSocketDisconnect:
        # Handles clean disconnects
        await collab_manager.disconnect_user(session_id, user_id)
    except Exception as e:
        logger.error(f"WebSocket error inside session '{session_id}' for user '{user_id}': {e}")
        await collab_manager.disconnect_user(session_id, user_id)
