// Renders the brand assets with headless Chrome so they use the real Archivo
// webfont rather than a system-font approximation.
//   npm run assets
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'sureride-assets-'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const INDIGO = '#1B2A6B';
const MARIGOLD = '#E8A33D';
const SAND = '#F4F1EC';
const FARES_CONFIRMED = process.env.FARES_CONFIRMED === '1';

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Sans+Devanagari:wght@500;600&display=swap">`;

const page = (w, h, body, css = '') => `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:Archivo,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
.hi{font-family:'Noto Sans Devanagari',Archivo,sans-serif}
${css}
</style></head><body>${body}</body></html>`;

function shot(html, out, w, h) {
  const f = path.join(TMP, `${path.basename(out, '.png')}.html`);
  fs.writeFileSync(f, html);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--virtual-time-budget=4000', `--window-size=${w},${h}`,
    `--screenshot=${out}`, `file://${f}`,
  ], { stdio: 'pipe' });
  console.log('  ', path.relative(ROOT, out), `${w}×${h}`, `${(fs.statSync(out).size / 1024).toFixed(0)}kB`);
}

/* ---------------- square monogram: the marigold R is the brand's tell -------- */
const monogram = (size) => page(size, size, `
  <div class="box"><span class="s">S</span><span class="r">R</span></div>`, `
  .box{width:${size}px;height:${size}px;background:${INDIGO};display:flex;align-items:center;
       justify-content:center}
  .s,.r{font-weight:800;font-size:${size * 0.5}px;line-height:1}
  /* Tighten only BETWEEN the letters — letter-spacing on the parent would also
     add a trailing gap after the R and push the pair visually left. */
  .s{color:#fff;letter-spacing:-.05em}
  .r{color:${MARIGOLD}}`);

/* ---------------- share card ------------------------------------------------ */
const ogCard = ({ eyebrow, title, meta, price }) => page(1200, 630, `
  <div class="card">
    <div class="top">
      <span class="mark">Sure<span class="r">R</span>ide</span>
      <span class="desc">Fixed fare. Named driver.</span>
    </div>
    <div class="mid">
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h1>${title}</h1>
      ${meta ? `<p class="meta">${meta}</p>` : ''}
      ${price ? `<p class="price"><span>from</span> ${price}</p>` : ''}
    </div>
    <div class="bottom">
      <span class="triad">Sure fare · Sure driver · Sure time</span>
      <span class="hi hindi">किराया पक्का। ड्राइवर पक्का।</span>
    </div>
  </div>`, `
  .card{width:1200px;height:630px;background:${INDIGO};color:#fff;padding:64px 72px;
        display:flex;flex-direction:column;justify-content:space-between;position:relative}
  .card:after{content:'';position:absolute;left:0;top:0;bottom:0;width:14px;background:${MARIGOLD}}
  .top{display:flex;align-items:baseline;gap:22px}
  .mark{font-weight:800;font-size:44px;letter-spacing:-.025em}
  .r{color:${MARIGOLD}}
  .desc{font-weight:600;font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:#B9C0DE}
  .mid{display:flex;flex-direction:column;gap:14px}
  .eyebrow{font-weight:600;font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:${MARIGOLD}}
  h1{font-weight:800;font-size:${'{{SIZE}}'};line-height:1.04;letter-spacing:-.03em;max-width:19ch}
  .meta{font-weight:500;font-size:28px;color:#D5DAEE;font-variant-numeric:tabular-nums}
  .price{font-weight:800;font-size:40px;color:#fff;font-variant-numeric:tabular-nums}
  .price span{font-weight:500;font-size:24px;color:#B9C0DE}
  .bottom{display:flex;align-items:baseline;justify-content:space-between;gap:24px;
          border-top:1px solid #35418C;padding-top:24px}
  .triad{font-weight:700;font-size:24px}
  .hindi{font-weight:500;font-size:24px;color:${MARIGOLD}}`);

const og = (o) => ogCard(o).replace('{{SIZE}}', o.title.length > 34 ? '62px' : '76px');

console.log('brand assets →');
shot(monogram(512), path.join(ROOT, 'src/app/icon.png'), 512, 512);
shot(monogram(180), path.join(ROOT, 'src/app/apple-icon.png'), 180, 180);
shot(og({
  title: 'Cabs across Rajasthan, Delhi, Haryana and UP.',
  meta: 'Written quote · driver details before pickup',
}), path.join(ROOT, 'src/app/opengraph-image.png'), 1200, 630);

/* ---------------- one share card per route ---------------------------------- */
const routesSrc = fs.readFileSync(path.join(ROOT, 'src/data/routes.ts'), 'utf8');
const routes = JSON.parse(
  routesSrc.slice(routesSrc.indexOf('export const routes: Route[] = [') + 31, routesSrc.lastIndexOf('];') + 1),
);

console.log('route share cards →');
for (const r of routes) {
  shot(
    og({
      eyebrow: 'Taxi service',
      title: r.h1,
      meta: r.sub,
      price: FARES_CONFIRMED ? r.fromPrice : undefined,
    }),
    path.join(ROOT, 'public/og', `${r.slug}.png`),
    1200, 630,
  );
}

fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\ndone — ${routes.length + 3} assets`);
