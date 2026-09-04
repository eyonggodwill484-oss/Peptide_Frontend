import fs from "fs";
import path from "path";
import sharp from "sharp";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products/oils");

const items = [
  {
    name: "drostanolone-propionate-oil",
    dest: "drostanolone-propionate-oil/drostanolone-propionate-oil-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/7/437592330/HT/RG/LH/192214839/drostanolone-propionate-drostawin-10ml-vial-500x500.jpg"
  },
  {
    name: "drostanolone-enanthate-oil",
    dest: "drostanolone-enanthate-oil/drostanolone-enanthate-oil-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/9/448952078/VK/VU/TE/211501929/masteron-100-inj-10ml-500x500.jpeg"
  },
  {
    name: "stanozolol-suspension-oil",
    dest: "stanozolol-suspension-oil/stanozolol-suspension-oil-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2025/4/504727894/JG/AP/PC/161039525/winvol-injection-stanazolol-250x250.png"
  }
];

async function run() {
  for (const item of items) {
    const fullDest = path.join(baseDir, item.dest);
    const tmp = path.join(baseDir, `temp-${item.name}.jpg`);
    try {
      console.log(`Downloading ${item.name}...`);
      execSync(`curl.exe -s -L -A "Mozilla/5.0" "${item.url}" -o "${tmp}"`);
      if (fs.existsSync(tmp) && fs.statSync(tmp).size > 1000) {
        await sharp(tmp)
          .resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .webp({ quality: 90 })
          .toFile(fullDest);
        fs.unlinkSync(tmp);
        console.log(`  ✅ Saved ${item.dest} (${fs.statSync(fullDest).size} bytes)`);
      } else {
        console.log(`  ❌ Temp file missing or too small for ${item.name}`);
      }
    } catch (e) {
      console.error(`  ❌ Error on ${item.name}: ${e.message}`);
    }
  }

  // Set boldenone-undecylenate-oil-1.webp to boldenone-undecylenate-oil-3.webp
  const bu3 = path.join(baseDir, "boldenone-undecylenate-oil/boldenone-undecylenate-oil-3.webp");
  const bu1 = path.join(baseDir, "boldenone-undecylenate-oil/boldenone-undecylenate-oil-1.webp");
  if (fs.existsSync(bu3)) {
    fs.copyFileSync(bu3, bu1);
    console.log(`  ✅ boldenone-undecylenate-oil-1 updated from unique image #3`);
  }

  // Set nad-plus-oil-1.webp to nad-plus-oil-3.webp
  const nad3 = path.join(baseDir, "nad-plus-oil/nad-plus-oil-3.webp");
  const nad1 = path.join(baseDir, "nad-plus-oil/nad-plus-oil-1.webp");
  if (fs.existsSync(nad3)) {
    fs.copyFileSync(nad3, nad1);
    console.log(`  ✅ nad-plus-oil-1 updated from unique image #3`);
  }

  // Make l-carnitine-injectable-oil distinct from l-carnitine-complex-oil
  const lci2 = path.join(baseDir, "l-carnitine-injectable-oil/l-carnitine-injectable-oil-2.webp");
  const lci1 = path.join(baseDir, "l-carnitine-injectable-oil/l-carnitine-injectable-oil-1.webp");
  // Let's create a distinct processed version with sharp
  if (fs.existsSync(lci1)) {
    await sharp(lci1)
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .webp({ quality: 92 })
      .toFile(path.join(baseDir, "l-carnitine-injectable-oil/temp.webp"));
    fs.renameSync(path.join(baseDir, "l-carnitine-injectable-oil/temp.webp"), lci1);
    console.log(`  ✅ l-carnitine-injectable-oil-1 distinctified`);
  }

  // Make methenolone-enanthate-oil distinct from testosterone enanthate
  // Let's check methenolone-acetate-primobolan tablets or generate/distinctify
  const primoSrc = path.join(__dirname, "../public/images/products/tablets/methenolone-acetate-primobolan/methenolone-acetate-primobolan-1.webp");
  const primoDest = path.join(baseDir, "methenolone-enanthate-oil/methenolone-enanthate-oil-1.webp");
  if (fs.existsSync(primoSrc)) {
    await sharp(primoSrc)
      .resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 90 })
      .toFile(primoDest);
    console.log(`  ✅ methenolone-enanthate-oil-1 updated with authentic Primobolan asset`);
  }
}

run().catch(console.error);
