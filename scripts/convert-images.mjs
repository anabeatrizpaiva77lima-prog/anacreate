// Converte JPG/PNG de public/img e public/covers para WebP (qualidade 90 = -10%).
// Arquivos que já são WebP ficam como estão (re-encodar só perderia qualidade).
import { readdir, unlink, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = ["public/img", "public/covers"];
const QUALITY = 90;

for (const dir of DIRS) {
  for (const file of await readdir(dir)) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const src = path.join(dir, file);
    const out = src.replace(/\.(jpe?g|png)$/i, ".webp");
    await sharp(src).webp({ quality: QUALITY }).toFile(out);
    const [a, b] = [(await stat(src)).size, (await stat(out)).size];
    console.log(`${src} -> ${path.basename(out)}  ${(a / 1024).toFixed(0)}KB -> ${(b / 1024).toFixed(0)}KB`);
    await unlink(src);
  }
}
