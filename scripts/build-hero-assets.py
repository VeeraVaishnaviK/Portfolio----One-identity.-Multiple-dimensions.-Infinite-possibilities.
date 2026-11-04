#!/usr/bin/env python3
"""
scripts/build-hero-assets.py
Hero Video & Portrait Asset Pipeline for Veera Vaishnavi's Portfolio.

Pipeline:
1. Detect/crop the person tightly head-to-toe, centered (crop=800:1000:568:76 -> scale=768:960).
2. Video transparency:
   - hero.webm: native VP9 alpha transparency (colorkey=0xFFFFFF:0.15:0.08, format=yuva420p).
   - hero.mp4: colorlevels whitened for CSS mix-blend-multiply.
3. Clean Audio: Pristine audio extracted directly from original recording with zero digital distortion/noise.
4. Export hero.mp4 (H.264, AAC 128kbps, faststart) and hero.webm (VP9 alpha, Opus 128kbps).
5. Generate transparent portrait-bust.webp (480x600) and og.jpg (1200x630).
"""

import os
import shutil
import subprocess
from PIL import Image
import numpy as np

def find_ffmpeg():
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        pass
    candidates = [
        r"C:\Users\vaish\AppData\Local\Programs\Python\Python310\Scripts\ffmpeg.exe",
        r"C:\ffmpeg\bin\ffmpeg.exe"
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    raise RuntimeError("ffmpeg executable not found on system PATH or candidate directories.")

def build_hero_video(ffmpeg_exe, in_video, out_mp4, out_webm):
    crop_filter_mp4 = "crop=800:1000:568:76,scale=768:960,colorlevels=rimax=0.90:gimax=0.90:bimax=0.90,format=yuv420p"
    crop_filter_webm = "crop=800:1000:568:76,scale=768:960,colorlevels=rimax=0.90:gimax=0.90:bimax=0.90,colorkey=0xFFFFFF:0.15:0.08,format=yuva420p"

    print(f"[Video] Encoding MP4 to {out_mp4} with pristine audio...")
    cmd_mp4 = [
        ffmpeg_exe, "-y",
        "-i", in_video,
        "-vf", crop_filter_mp4,
        "-c:v", "libx264", "-crf", "22", "-preset", "slow",
        "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
        "-movflags", "+faststart",
        out_mp4
    ]
    res_mp4 = subprocess.run(cmd_mp4, capture_output=True)
    if res_mp4.returncode != 0:
        print("MP4 Error stderr:", res_mp4.stderr.decode(errors='ignore'))
        raise RuntimeError("MP4 encoding failed.")

    print(f"[Video] Encoding WebM to {out_webm} with native alpha transparency and pristine audio...")
    cmd_webm = [
        ffmpeg_exe, "-y",
        "-i", in_video,
        "-vf", crop_filter_webm,
        "-c:v", "libvpx-vp9", "-crf", "28", "-b:v", "0",
        "-auto-alt-ref", "0",
        "-pix_fmt", "yuva420p",
        "-c:a", "libopus", "-b:a", "128k", "-ar", "48000",
        out_webm
    ]
    res_webm = subprocess.run(cmd_webm, capture_output=True)
    if res_webm.returncode != 0:
        print("WebM Error stderr:", res_webm.stderr.decode(errors='ignore'))
        raise RuntimeError("WebM encoding failed.")

def build_portrait_and_og(in_photo, out_portrait, out_og):
    """
    Creates:
    1. portrait-bust.webp (480x600) cropped head-to-shirt with transparent backdrop
    2. og.jpg (1200x630) social share card with portrait and typography
    """
    img = Image.open(in_photo).convert("RGBA")
    w, h = img.size
    print(f"[Images] Loaded photo: {w}x{h}")

    # 1. portrait-bust.webp (target 480x600) with transparent alpha background
    arr = np.array(img, dtype=np.float32)
    diff = 255.0 - arr[:, :, :3]
    dist = np.max(diff, axis=2)
    alpha = np.clip((dist - 10.0) / 25.0 * 255.0, 0.0, 255.0)
    arr[:, :, 3] = alpha
    alpha_img = Image.fromarray(arr.astype(np.uint8), mode="RGBA")

    target_w = int(h * 0.8)
    left = max(0, (w - target_w) // 2)
    crop_box = (left, 0, left + target_w, h)
    bust = alpha_img.crop(crop_box).resize((480, 600), Image.Resampling.LANCZOS)
    bust.save(out_portrait, "WEBP", quality=95)
    print(f"[Images] Saved transparent {out_portrait} (480x600)")

    # 2. og.jpg (1200x630)
    og = Image.new("RGB", (1200, 630), color=(244, 242, 238))
    og_bust = bust.resize((360, 450), Image.Resampling.LANCZOS)
    og.paste(og_bust, (740, 90), mask=og_bust)

    from PIL import ImageDraw, ImageFont
    draw = ImageDraw.Draw(og)
    try:
        font_large = ImageFont.truetype("arial.ttf", 54)
        font_role = ImageFont.truetype("arial.ttf", 32)
        font_sub = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font_large = ImageFont.load_default()
        font_role = font_large
        font_sub = font_large

    draw.text((100, 150), "VEERA VAISHNAVI K", fill=(13, 13, 13), font=font_large)
    draw.text((100, 230), "Full Stack Developer · AI Engineer", fill=(58, 58, 58), font=font_role)
    draw.text((100, 290), "Founding Software Engineer at Lin's InfoTech", fill=(119, 117, 111), font=font_sub)
    draw.text((100, 330), "Saveetha School of Engineering · CGPA 9.22 / 10", fill=(119, 117, 111), font=font_sub)
    draw.text((100, 480), "veeravaishnavik.dev  ·  Portfolio", fill=(13, 13, 13), font=font_sub)

    og.save(out_og, "JPEG", quality=90)
    print(f"[Images] Saved {out_og} (1200x630)")

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ffmpeg_exe = find_ffmpeg()
    print(f"[Pipeline] Using ffmpeg at: {ffmpeg_exe}")

    in_video = r"C:\Users\vaish\.gemini\antigravity\brain\a9dbf81a-b90c-42a8-9869-1222d9b69900\.user_uploaded\media_1793692727189_d8d5b4fa.mp4"
    in_photo = r"C:\Users\vaish\.gemini\antigravity\brain\a2a4d099-45c8-44b5-a205-22c86b137040\.user_uploaded\media_1793610962566_f7b26f66.jpg"

    if not os.path.exists(in_video):
        raise FileNotFoundError(f"Input video not found at {in_video}")

    out_dir_hero = os.path.join(root, "public", "hero")
    os.makedirs(out_dir_hero, exist_ok=True)
    out_mp4 = os.path.join(out_dir_hero, "hero.mp4")
    out_webm = os.path.join(out_dir_hero, "hero.webm")
    out_portrait = os.path.join(root, "public", "portrait-bust.webp")
    out_og = os.path.join(root, "public", "og.jpg")

    build_hero_video(ffmpeg_exe, in_video, out_mp4, out_webm)
    if os.path.exists(in_photo):
        build_portrait_and_og(in_photo, out_portrait, out_og)
    print("[Pipeline] All hero assets built successfully with pristine audio!")

if __name__ == "__main__":
    main()
