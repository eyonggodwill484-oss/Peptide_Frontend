import fs from "fs";

const content = fs.readFileSync("src/lib/data/variable-products.ts", "utf8");
const lines = content.split("\n");

const targets = [
  "ACE-031",
  "Alprostadil",
  "BPC-157 5mg + TB-500",
  "BPC157 10mg+GHK-CU",
  "Dermorphin",
  "Epithalon",
  "Erythropoietin",
  "Follistatin 344",
  "FOXO4-DRI",
  "GDF-8",
  "Glutathione",
  "SS-31",
  "MOTS-c",
  "Kisspeptin-10",
  "PT-141",
  "HMG",
  "Insulin",
  "PNC-27",
  "Tesamorelin",
  "Survodutide",
  "Somatropin - 10iu",
  "MGF ( Mechano Growth Factor)"
];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const t of targets) {
    if (line.includes(t)) {
      console.log(`L${i + 1}: ${line.trim()}`);
      // find next images: line
      for (let j = i; j < Math.min(i + 25, lines.length); j++) {
        if (lines[j].includes("images:")) {
          console.log(`   L${j + 1}: ${lines[j].trim()}`);
          break;
        }
      }
    }
  }
}
