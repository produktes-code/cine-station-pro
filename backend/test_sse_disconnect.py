# Usaremos un test directo del generador para evitar dependencias complejas de ASGI

# Usaremos un test mas directo del generador para evitar dependencias complejas de ASGI

import unittest
from unittest.mock import AsyncMock
from app.api.endpoints.render import get_render_progress_sse


class TestSseDisconnect(unittest.IsolatedAsyncioTestCase):
    async def test_generator_disconnects(self):
        from starlette.requests import Request

        # Scope mock para request valido
        scope = {
            "type": "http",
            "client": ("127.0.0.1", 8000),
            "method": "GET",
            "headers": [],
            "path": "/api/render/progress",
        }
        request = Request(scope)
        # Simulamos is_disconnected
        request.is_disconnected = AsyncMock(side_effect=[False, True])

        response = await get_render_progress_sse(request, "job_123")

        # Iteramos el generador del StreamingResponse
        # response.body_iterator es el generador
        count = 0
        async for _ in response.body_iterator:
            count += 1

        # Solo debio retornar 1 vez, porque en la segunda yields is_disconnected es True y hace break
        self.assertEqual(count, 1)


if __name__ == "__main__":
    unittest.main()
