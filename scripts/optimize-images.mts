/**
 * Genera las imágenes publicadas a partir de los originales en assets/obras.
 *
 *   assets/obras/<nombre>.(jpeg|png)  →  public/obras/<nombre>.webp         (modal, ≤ 2400×1800px)
 *                                     →  public/obras/thumbs/<nombre>.webp  (fondo flotante, ancho 520px)
 *
 * Además genera public/obras/og/li-tamara-retrato.jpg (1200px) para Open Graph,
 * porque algunas redes no aceptan WebP en og:image.
 *
 * Uso: npm run images
 */
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, extname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "assets", "obras");
const outDir = join(root, "public", "obras");
const thumbDir = join(outDir, "thumbs");
const ogDir = join(outDir, "og");

const FULL_MAX_W = 2400; // deja espacio a las panorámicas
const FULL_MAX_H = 1800;
const THUMB_WIDTH = 520;
const OG_SOURCE = "li-tamara-retrato.png";

rmSync(outDir, { recursive: true, force: true });
for (const dir of [outDir, thumbDir, ogDir])
  mkdirSync(dir, { recursive: true });

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;

const files = readdirSync(srcDir).filter((f) =>
  [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase()),
);

for (const file of files) {
  const input = join(srcDir, file);
  const { name } = parse(file);
  const full = join(outDir, `${name}.webp`);
  const thumb = join(thumbDir, `${name}.webp`);

  await sharp(input)
    .rotate()
    .resize({
      width: FULL_MAX_W,
      height: FULL_MAX_H,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 6 })
    .toFile(full);

  await sharp(input)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(thumb);

  const size = statSync(input).size;
  const out = statSync(full).size + statSync(thumb).size;
  before += size;
  after += out;
  console.log(`${file.padEnd(40)} ${kb(size).padStart(8)} → ${kb(out)}`);
}

await sharp(join(srcDir, OG_SOURCE))
  .rotate()
  .resize({ width: 1200, withoutEnlargement: true })
  .flatten({ background: "#c41e1e" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(ogDir, `${parse(OG_SOURCE).name}.jpg`));

console.log(`\nTotal: ${kb(before)} → ${kb(after)} (${files.length} imágenes)`);
