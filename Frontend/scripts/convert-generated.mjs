import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brainDir = "C:/Users/HP/.gemini/antigravity-ide/brain/612f893c-4d46-4962-be4e-f259108283a4";
const baseDir = path.join(__dirname, "../public/images/products");

const jobs = [
  {
    src: path.join(brainDir, "nad_plus_vial_1788504853675.jpg"),
    dest: path.join(baseDir, "nad-plus/nad-plus-1.webp")
  },
  {
    src: path.join(brainDir, "vip_peptide_vial_1788504899023.jpg"),
    dest: path.join(baseDir, "vasoactive-intestinal/vasoactive-intestinal-1.webp")
  },
  {
    src: path.join(brainDir, "melatonin_tablets_bottle_1788504958965.jpg"),
    dest: path.join(baseDir, "melatonin/melatonin-1.webp")
  },
  {
    // Also convert survodutide-1.jpg if needed
    src: path.join(baseDir, "survodutide/survodutide-1.jpg"),
    dest: path.join(baseDir, "survodutide/survodutide-1.webp")
  }
];

async function run() {
  for (const job of jobs) {
    if (!fs.existsSync(job.src)) {
      console.error(`Source not found: ${job.src}`);
      continue;
    }
    const dir = path.dirname(job.dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(job.src)
      .resize(1000, 1000, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 90 })
      .toFile(job.dest);

    console.log(`✅ Converted ${path.basename(job.dest)} (${fs.statSync(job.dest).size} bytes)`);
  }
}

run().catch(console.error);
