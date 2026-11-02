import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'output', 'brand-kit');
const LOGO_DIR = path.join(OUT, '01-logo');
const FAVICON_DIR = path.join(OUT, '02-favicon');
const MAT_DIR = path.join(OUT, '03-matting-print');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'sureride-brand-kit-'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FONT_PATH = path.join(ROOT, '.next', 'static', 'media', '1a4aa50920b5315c-s.p.woff2');

const INDIGO = '#1B2A6B';
const MARIGOLD = '#E8A33D';
const SAND = '#F4F1EC';
const PALE_INDIGO = '#B9C0DE';

for (const dir of [LOGO_DIR, FAVICON_DIR, MAT_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(CHROME)) {
  throw new Error(`Google Chrome was not found at ${CHROME}`);
}
if (!fs.existsSync(FONT_PATH)) {
  throw new Error('The compiled Archivo webfont is missing. Run `npm run build` first.');
}

const fontBase64 = fs.readFileSync(FONT_PATH).toString('base64');
const fontFace = `@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${fontBase64}) format('woff2');font-style:normal;font-weight:400 900}`;

function write(file, contents) {
  fs.writeFileSync(file, contents);
  console.log(path.relative(ROOT, file));
}

function svgShell({ width, height, body, background = 'none' }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">SureRide logo</title>
  <desc id="desc">SureRide wordmark in indigo with a marigold R</desc>
  <style>${fontFace}</style>
  ${background === 'none' ? '' : `<rect width="${width}" height="${height}" fill="${background}"/>`}
  ${body}
</svg>
`;
}

function wordmarkSvg({ dark = false, monochrome = false } = {}) {
  const primary = dark ? '#FFFFFF' : INDIGO;
  const accent = monochrome ? primary : MARIGOLD;
  const descriptor = dark ? PALE_INDIGO : INDIGO;
  return svgShell({
    width: 1600,
    height: 440,
    body: `
  <text x="800" y="270" text-anchor="middle" fill="${primary}" font-family="Archivo, Arial, sans-serif" font-size="270" font-weight="800" letter-spacing="-8">Sure<tspan fill="${accent}">R</tspan>ide</text>
  <text x="800" y="370" text-anchor="middle" fill="${descriptor}" font-family="Archivo, Arial, sans-serif" font-size="49" font-weight="700" letter-spacing="12">FIXED FARE. NAMED DRIVER.</text>`,
  });
}

function monogramSvg(size = 1024) {
  return svgShell({
    width: size,
    height: size,
    background: INDIGO,
    body: `<text x="${size / 2}" y="${size * 0.67}" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-size="${size * 0.51}" font-weight="800" letter-spacing="${-size * 0.035}"><tspan fill="#FFFFFF">S</tspan><tspan fill="${MARIGOLD}">R</tspan></text>`,
  });
}

function matSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="297mm" height="420mm" viewBox="0 0 297 420" role="img" aria-labelledby="title desc">
  <title id="title">SureRide A3 printable paper floor mat</title>
  <desc id="desc">Minimal white A3 floor mat with the SureRide logo printed at the top</desc>
  <style>${fontFace}</style>
  <rect width="297" height="420" fill="#FFFFFF"/>
  <rect x="8" y="8" width="281" height="404" rx="1.5" fill="none" stroke="${INDIGO}" stroke-width="0.8"/>
  <rect x="8" y="8" width="281" height="4" fill="${MARIGOLD}"/>
  <text x="148.5" y="49" text-anchor="middle" fill="${INDIGO}" font-family="Archivo, Arial, sans-serif" font-size="31" font-weight="800" letter-spacing="-0.9">Sure<tspan fill="${MARIGOLD}">R</tspan>ide</text>
  <text x="148.5" y="61.5" text-anchor="middle" fill="${INDIGO}" font-family="Archivo, Arial, sans-serif" font-size="5.2" font-weight="700" letter-spacing="1.35">FIXED FARE. NAMED DRIVER.</text>
  <line x1="66" y1="72" x2="231" y2="72" stroke="${MARIGOLD}" stroke-width="1"/>
  <g opacity="0.055">
    <text x="148.5" y="265" text-anchor="middle" fill="${INDIGO}" font-family="Archivo, Arial, sans-serif" font-size="91" font-weight="800" letter-spacing="-5">S<tspan fill="${MARIGOLD}">R</tspan></text>
  </g>
  <text x="148.5" y="394" text-anchor="middle" fill="${INDIGO}" font-family="Archivo, Arial, sans-serif" font-size="4.2" font-weight="700" letter-spacing="0.9">SURE FARE  ·  SURE DRIVER  ·  SURE TIME</text>
</svg>
`;
}

const primarySvg = path.join(LOGO_DIR, 'sureride-logo-primary.svg');
const darkSvg = path.join(LOGO_DIR, 'sureride-logo-for-dark-background.svg');
const monoSvg = path.join(LOGO_DIR, 'sureride-logo-one-colour.svg');
const monogramSvgPath = path.join(LOGO_DIR, 'sureride-monogram.svg');
const matSvgPath = path.join(MAT_DIR, 'sureride-matting-A3-print.svg');

write(primarySvg, wordmarkSvg());
write(darkSvg, wordmarkSvg({ dark: true }));
write(monoSvg, wordmarkSvg({ monochrome: true }));
write(monogramSvgPath, monogramSvg());
write(matSvgPath, matSvg());

async function renderSvg(svgPath, pngPath, width, background) {
  let pipeline = sharp(svgPath, { density: 220 }).resize({ width });
  if (background) pipeline = pipeline.flatten({ background });
  await pipeline.png().toFile(pngPath);
  console.log(path.relative(ROOT, pngPath));
}

await renderSvg(primarySvg, path.join(LOGO_DIR, 'sureride-logo-primary-2400px.png'), 2400);
await renderSvg(darkSvg, path.join(LOGO_DIR, 'sureride-logo-for-dark-background-2400px.png'), 2400);
await renderSvg(monoSvg, path.join(LOGO_DIR, 'sureride-logo-one-colour-2400px.png'), 2400);
const monogramPng = path.join(LOGO_DIR, 'sureride-monogram-1024.png');
await renderSvg(monogramSvgPath, monogramPng, 1024);

const faviconSizes = [16, 32, 48];
const faviconPngs = [];
for (const size of faviconSizes) {
  const out = path.join(FAVICON_DIR, `favicon-${size}x${size}.png`);
  await sharp(monogramPng).resize(size, size).png().toFile(out);
  faviconPngs.push(out);
  console.log(path.relative(ROOT, out));
}

await sharp(monogramPng).resize(180, 180).png().toFile(path.join(FAVICON_DIR, 'apple-touch-icon.png'));
await sharp(monogramPng).resize(192, 192).png().toFile(path.join(FAVICON_DIR, 'android-chrome-192x192.png'));
await sharp(monogramPng).resize(512, 512).png().toFile(path.join(FAVICON_DIR, 'android-chrome-512x512.png'));

function buildIco(pngPaths) {
  const images = pngPaths.map((file) => fs.readFileSync(file));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = Buffer.alloc(images.length * 16);
  let offset = 6 + entries.length;
  images.forEach((image, index) => {
    const size = faviconSizes[index];
    const base = index * 16;
    entries.writeUInt8(size === 256 ? 0 : size, base);
    entries.writeUInt8(size === 256 ? 0 : size, base + 1);
    entries.writeUInt8(0, base + 2);
    entries.writeUInt8(0, base + 3);
    entries.writeUInt16LE(1, base + 4);
    entries.writeUInt16LE(32, base + 6);
    entries.writeUInt32LE(image.length, base + 8);
    entries.writeUInt32LE(offset, base + 12);
    offset += image.length;
  });
  return Buffer.concat([header, entries, ...images]);
}

write(path.join(FAVICON_DIR, 'favicon.ico'), buildIco(faviconPngs));

const matHtmlPath = path.join(TMP, 'sureride-matting-A3.html');
const matPdfPath = path.join(MAT_DIR, 'sureride-matting-A3-print.pdf');
write(matHtmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFace}
@page{size:A3 portrait;margin:0}
html,body{width:297mm;height:420mm;margin:0;padding:0;background:#fff}
body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
svg{display:block;width:297mm;height:420mm}
</style></head><body>${matSvg().replace(/^<\?xml[^>]+>\s*/, '')}</body></html>`);

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-pdf-header-footer',
  '--print-to-pdf-no-header',
  `--print-to-pdf=${matPdfPath}`,
  `file://${matHtmlPath}`,
], { stdio: 'pipe' });
console.log(path.relative(ROOT, matPdfPath));

write(path.join(OUT, 'README.txt'), `SureRide brand asset kit
========================

Brand colours
- Indigo:   ${INDIGO}
- Marigold: ${MARIGOLD}
- Sand:     ${SAND}
- Typeface: Archivo ExtraBold / Bold

01-logo
- Primary SVG and 2400 px transparent PNG for light backgrounds.
- White SVG and PNG for dark backgrounds.
- One-colour SVG and PNG for low-cost single-colour printing.
- Square SR monogram in SVG and 1024 px PNG.

02-favicon
- favicon.ico containing 16, 32 and 48 px artwork.
- Individual browser PNGs, Apple touch icon and Android icons.

03-matting-print
- A3 portrait print-ready PDF (297 x 420 mm).
- Scalable SVG source.
- PNG preview.

Print instruction
- Print the PDF at 100% / Actual Size. Do not use Fit to Page.
- Keep the logo at the top of the mat.
- Confirm the physical mat/die size with the printer before bulk production.
- If the printer uses a custom die, place the supplied SVG into that die line without stretching it.
`);

fs.rmSync(TMP, { recursive: true, force: true });
console.log('\nSureRide brand kit generated.');
