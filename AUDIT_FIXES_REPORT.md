# AUDIT FIXES REPORT (Nivel 4)

## TAREA 1: Agujero de Red y Seguridad (Security)
**Estado:** ✅ Completado
**Diff Resumido:**
- `backend/Dockerfile:8`: Modificado `CMD ["sh","-c","uvicorn app.main:app --host ${HOST:-127.0.0.1} --port 8000"]`
- `backend/app/core/config.py`: Modificado `ALLOWED_ORIGINS` para `http://localhost:5173,http://127.0.0.1:5173`
- `backend/app/core/config.py`: Generación dinámica de `SECRET_KEY` vía `secrets.token_urlsafe(32)` y validación estricta para producción.

**Verificación:**
- *Salida real de Pytest*: 
  ```text
  backend-tests    Test with pytest    2026-07-21T01:45:36.7250762Z ..........................                       [100%]
  backend-tests    Test with pytest    2026-07-21T01:45:36.7255571Z 26 passed in 1.15s
  ```

## TAREA 2: Vulnerabilidades en Dependencias Pineadas (Deps)
**Estado:** ✅ Completado
**Diff Resumido:**
- `backend/requirements.txt`: Subidos `python-multipart>=0.0.31`, `fastapi>=0.115.0`, `starlette>=0.47.2`, `python-dotenv>=1.2.2`.
- Generado nuevo `requirements-lock.txt` libre de dependencias vulnerables.

**Verificación (pip-audit):**
- *Salida real de pip-audit*:
  ```text
  Successfully installed CacheControl-0.14.4 boolean.py-5.0 certifi-2026.6.17... pip-audit-2.10.1
  No known vulnerabilities found
  ```
