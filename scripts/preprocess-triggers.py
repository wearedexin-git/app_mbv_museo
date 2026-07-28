#!/usr/bin/env python3
"""
Preprocess foto trigger per image tracking 8th Wall.

- Converte HEIC/PNG/JPEG in JPG
- Ridimensiona (lato lungo max MAX_SIDE)
- "Polarizza": riduce riflessi/ombre marcate e appiattisce l'illuminazione
  (scala di grigi + equalizzazione + compressione tonale)

Uso:
  .venv/bin/python scripts/preprocess-triggers.py \\
    --input foto.HEIC --output src/asset/.../trigger_foo.jpg
"""

from __future__ import annotations

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


MAX_SIDE = 1600
JPEG_QUALITY = 90


def heic_to_jpeg(src: Path, dst: Path) -> None:
    """Usa sips (macOS) per convertire HEIC → JPEG."""
    result = subprocess.run(
        ["sips", "-s", "format", "jpeg", str(src), "--out", str(dst)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0 or not dst.exists():
        raise RuntimeError(f"sips failed for {src}:\n{result.stderr}")


def load_rgb(path: Path) -> Image.Image:
    suffix = path.suffix.lower()
    if suffix in {".heic", ".heif"}:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_jpg = Path(tmp) / "converted.jpg"
            heic_to_jpeg(path, tmp_jpg)
            img = Image.open(tmp_jpg)
            img.load()
            # Applica rotazione EXIF (foto iPhone spesso non upright)
            img = ImageOps.exif_transpose(img) or img
            return img.convert("RGB")
    img = Image.open(path)
    img.load()
    img = ImageOps.exif_transpose(img) or img
    return img.convert("RGB")


def resize_max(img: Image.Image, max_side: int) -> Image.Image:
    w, h = img.size
    longest = max(w, h)
    if longest <= max_side:
        return img
    scale = max_side / float(longest)
    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def polarize(img: Image.Image) -> Image.Image:
    """
    Illuminazione più neutra e piatta per tracking:
    1. Scala di grigi (rimuove tinta / riflessi colorati)
    2. Equalizzazione contrasto locale-globale
    3. Compressione tonale (meno ombre nere / luci bruciate)
    4. Lieve blur per attenuare specularità puntiformi
    5. Contrasto moderato per feature edges
    """
    gray = ImageOps.grayscale(img)

    # Attenua highlight puntiformi (riflessi speculari)
    soft = gray.filter(ImageFilter.MedianFilter(size=3))

    # Equalizza per ridurre gradienti di luce
    eq = ImageOps.equalize(soft)

    # Blend: non usare solo equalize (può amplificare rumore)
    blended = Image.blend(soft, eq, alpha=0.45)

    # Comprimi dinamica verso i mezzitoni (più "piatto")
    enhancer = ImageEnhance.Contrast(blended)
    flat = enhancer.enhance(0.85)

    # Leggero sharpening strutturale (edge utili al tracker)
    flat = flat.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=3))

    # Torna a RGB (JPG trigger coerente col resto del progetto)
    return flat.convert("RGB")


def process(input_path: Path, output_path: Path, max_side: int = MAX_SIDE) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    img = load_rgb(input_path)
    img = resize_max(img, max_side)
    img = polarize(img)
    img.save(output_path, format="JPEG", quality=JPEG_QUALITY, optimize=True)
    print(f"✅ {input_path.name} → {output_path} ({img.size[0]}x{img.size[1]})")


def main() -> int:
    parser = argparse.ArgumentParser(description="Preprocess trigger images for AR tracking")
    parser.add_argument("--input", "-i", required=True, type=Path)
    parser.add_argument("--output", "-o", required=True, type=Path)
    parser.add_argument("--max-side", type=int, default=MAX_SIDE)
    args = parser.parse_args()

    if not args.input.exists():
        print(f"❌ Input non trovato: {args.input}", file=sys.stderr)
        return 1

    try:
        process(args.input, args.output, args.max_side)
    except Exception as exc:
        print(f"❌ Errore: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
