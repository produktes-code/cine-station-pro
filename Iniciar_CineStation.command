#!/bin/bash
cd "$(dirname "$0")"
clear
echo "=========================================================="
echo "               INICIANDO CINESTATION PRO                  "
echo "=========================================================="
echo ""
echo "[1/3] Verificando dependencias y compilando..."
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build > /dev/null 2>&1

echo "[2/3] Iniciando motores locales (Frontend + Backend)..."
# Iniciar backend FastAPI
cd backend
./venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..

# Iniciar frontend
npx -y serve -s dist -l 5173 > /dev/null 2>&1 &
FRONTEND_PID=$!

# Asegurar que ambos servidores locales se detengan al salir del script
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

sleep 3
echo "[3/3] Abriendo el panel en tu navegador..."
open "http://localhost:5173"

echo ""
echo "=========================================================="
echo "¡Listo! CineStation Pro está activo en tu Mac."
echo "Mantén esta ventana del Terminal abierta mientras trabajes."
echo "Para cerrar el estudio, simplemente cierra esta ventana negra."
echo "=========================================================="

while true; do
  sleep 1
done
