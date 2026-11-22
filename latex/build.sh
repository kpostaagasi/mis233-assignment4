#!/bin/sh
# Kamil Postaağası, 2023501030
# Regenerate guide.tex from ../README.md and compile it to guide.pdf.
set -e
cd "$(dirname "$0")"
pandoc ../README.md -s --listings --toc -H header.tex \
  -V title="Destructuring Field Guide" -V author="Kamil Postaağası, 2023501030" \
  -V geometry:margin=2.2cm -V fontsize=11pt -V colorlinks=true \
  -V fontfamily=lmodern -o guide.tex
pdflatex -interaction=nonstopmode guide.tex > /dev/null
pdflatex -interaction=nonstopmode guide.tex > /dev/null
echo "guide.pdf built"
