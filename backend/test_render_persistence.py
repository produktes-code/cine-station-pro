import unittest
import importlib
import os
import time

from app.core.config import settings


class TestRenderPersistence(unittest.TestCase):
    def setUp(self):
        self.job_file = os.path.join(settings.TEMP_DIR, "render_jobs.json")
        if os.path.exists(self.job_file):
            os.remove(self.job_file)

    def test_persistence(self):
        # Primer "arranque"
        import app.services.render_manager as rm1

        # Asegurar que se usa en memoria (saltarse celery/redis en el test)
        rm1.redis_conn = None
        manager1 = rm1.RenderManager()

        # Crear un trabajo
        job_id = manager1.create_render_job("proj1", {}, {})
        manager1.start_render(job_id, "proj1", {}, {})

        # En este momento, start_render pone el estado en "queued" en in_memory
        # (y el thread worker lo tomaría y pondría en rendering)
        # Para evitar condiciones de carrera, verificamos que _save_jobs() se ejecutó al hacer start_render.
        # Esperamos un instante
        time.sleep(0.5)

        # Segundo "arranque" simulado recargando el módulo
        importlib.reload(rm1)
        manager2 = rm1.RenderManager()
        rm1.redis_conn = None

        # El status debe haber sobrevivido
        status = manager2.get_render_status(job_id)
        # Podría ser "queued" o "rendering" o "completed" dependiendo de la velocidad del hilo.
        # Lo importante es que no sea "failed" (que es el default para jobs desconocidos sin redis)
        # o que al menos exista en _in_memory_status
        self.assertIn(status, ["queued", "rendering", "completed"])

    def tearDown(self):
        if os.path.exists(self.job_file):
            os.remove(self.job_file)


if __name__ == "__main__":
    unittest.main()
