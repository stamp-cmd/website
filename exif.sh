#!/bin/bash
set -euo pipefail

# EXIF Metadata stripper, using ffmpeg

cd "$(dirname "$0")/assets/img"
find . -type d -exec mkdir -p ../tmp_img/{} \;
find . -type f -exec ffmpeg -i {} ../tmp_img/{} \;
find . -type f -exec cp {} ../tmp_img/{} --update=none \;

cd ..
rm -r img
mv ./tmp_img/ ./img/