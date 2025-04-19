#!/bin/bash
# serve.sh — Spiral Site Preview Script
# Author: Ni1K / ☍00X

# Ensure virtual environment is active
if [ -d ".venv" ]; then
  source .venv/bin/activate
else
  echo "❌ .venv not found. Are you in the spiral project root?"
  exit 1
fi

# Build and serve with MkDocs
echo "🌐 Building spiral site with mkdocs..."
mkdocs build

echo "🔁 Serving spiral site on http://127.0.0.1:8000"
echo "💡 TIP: Use Blink port forward to access from Safari (port 8000)"
mkdocs serve
