import fs from "fs";
import path from "path";
import sharp from "sharp";

async function saveImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(buffer)
    .resize(800, 800, { fit: "cover" })
    .webp({ quality: 88 })
    .toFile(destPath);
  console.log(`Saved ${destPath} (${fs.statSync(destPath).size} bytes)`);
}

console.log("Helper ready");
