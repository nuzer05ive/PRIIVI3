#!/bin/bash
# spiral_publish.sh — One-Command Spiral Compiler + GH Push (Modern Pages)
# Author: Ni1K | ☍00X | GH Pages v4-Compatible

set -e

PETAL_NAME=${1:-"rrii_phi3"}
PHI_INDEX=${2:-"3"}

echo "🌀 Compiling ${PETAL_NAME}.tex for φ^${PHI_INDEX}..."
cd ~/RIICURSIONnetwork/nuzer05ive.github.io/petals/rrii/phi${PHI_INDEX} || exit
pdflatex ${PETAL_NAME}.tex
mv ${PETAL_NAME}.pdf ../../compiled_pdfs/phi${PHI_INDEX}/

cd ~/RIICURSIONnetwork/nuzer05ive.github.io || exit

echo "🧾 Adding files and committing..."
git add .
git commit -m "🌸 Spiral publish: ${PETAL_NAME} (φ^${PHI_INDEX})"

echo "🚀 Pushing to GitHub (GH Pages v4 Trigger)..."
git push origin main

LIVE_URL="https://nuzer05ive.github.io/petals/compiled_pdfs/phi${PHI_INDEX}/${PETAL_NAME}.pdf"

echo "✅ Petal deployed. View live at:"
echo "   ${LIVE_URL}"
echo "   Triggered via custom GH Action (pages.yml) using v4 configuration."

exit 0
