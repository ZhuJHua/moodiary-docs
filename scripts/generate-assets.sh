#!/usr/bin/env bash
#
# Rasterise the Moodiary brand mark (packages/feature_base/moodiary_components/
# assets/brand in the app repo) into the icons the docs site ships, and build
# an adaptive `favicon.svg` that follows `prefers-color-scheme`.
#
# Requirements: librsvg (`rsvg-convert`) and ImageMagick (`magick`).
# Usage: ./scripts/generate-assets.sh /absolute/path/to/moodiary
set -euo pipefail

repo="${1:?usage: generate-assets.sh /absolute/path/to/moodiary}"
brand="$repo/packages/feature_base/moodiary_components/assets/brand"
out="$(cd "$(dirname "$0")/.." && pwd)/docs/public"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# favicon.svg — light colours by default, dark colours below 640px-ish themes.
{
  sed 's|<g clip-path=|<style>@media (prefers-color-scheme: dark){[fill="#54524E"]{fill:#808080}[fill="#2EB872"]{fill:#5CDE94}[fill="#FA4659"]{fill:#FFB3B3}}</style><g clip-path=|' "$brand/logo_light.svg"
} > "$out/favicon.svg"

# Raster copies: transparent 32x32 PNG as the Safari fallback (Safari does
# not support SVG favicons; PNG keeps the transparency the .ico used to
# flatten to white).  The touch icon stays white-backed — iOS renders
# transparent regions of home-screen icons as black.
rsvg-convert -w 512 -h 512 "$brand/logo_light.svg" -o "$tmp/512.png"
rsvg-convert -w 180 -h 180 "$brand/logo_light.svg" -o "$tmp/180.png"
rsvg-convert -w 32 -h 32 "$brand/logo_light.svg" -o "$out/favicon-32.png"

magick "$tmp/512.png" -background white -alpha remove -alpha off \
  -resize 180x180 "$out/apple-touch-icon.png"

echo "✔ wrote icons to $out"
