#!/bin/bash
cd "$(dirname "$0")"
clear
echo "=========================================================="
echo "               INICIANDO CINESTATION PRO                  "
echo "=========================================================="
echo ""
echo "[1/3] Compilando última versión..."
npm run build > /dev/null 2>&1

echo "[2/3] Iniciando motor local..."
npx -y serve -s dist -l 5173 > /dev/null 2>&1 &
SERVER_PID=$!

# Asegurar que el servidor local se detenga al salir del script
trap "kill $SERVER_PID; exit" INT TERM EXIT

sleep 2
echo "[2/2] Abriendo el panel en tu navegador..."
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
