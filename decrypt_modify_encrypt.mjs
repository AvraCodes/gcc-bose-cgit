import { webcrypto } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

const subtle = webcrypto.subtle;
const PASSWORD = 'Bose$GCC-Hyd&Blr-2026-VJ!secure';

function b64ToBytes(s) {
  return Uint8Array.from(Buffer.from(s, 'base64'));
}
function bytesToB64(buf) {
  return Buffer.from(buf).toString('base64');
}

async function decryptContent(salt, iv, ct, password, iter) {
  const kb = await subtle.importKey('raw', Buffer.from(password), 'PBKDF2', false, ['deriveKey']);
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', salt: b64ToBytes(salt), iterations: iter, hash: 'SHA-256' },
    kb, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  );
  const pt = await subtle.decrypt({ name: 'AES-GCM', iv: b64ToBytes(iv) }, key, b64ToBytes(ct));
  return new TextDecoder().decode(pt);
}

async function encryptContent(plaintext, password, iter) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv   = webcrypto.getRandomValues(new Uint8Array(12));
  const kb = await subtle.importKey('raw', Buffer.from(password), 'PBKDF2', false, ['deriveKey']);
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' },
    kb, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
  );
  const ct = await subtle.encrypt({ name: 'AES-GCM', iv }, key, Buffer.from(plaintext));
  return { salt: bytesToB64(salt), iv: bytesToB64(iv), ct: bytesToB64(new Uint8Array(ct)), iter };
}

// ── INDIA SAVINGS SECTION COMPONENT ──────────────────────────────────────────
const INDIA_SAVINGS_SECTION = `
    /* ===== INDIA SAVINGS CALCULATOR ===== */
    .savings-section{padding:80px 0;background:linear-gradient(135deg,#f8faff 0%,#eef3fb 100%);}
    .savings-wrap{max-width:1100px;margin:0 auto;padding:0 40px;}
    .savings-hd{display:flex;align-items:center;gap:16px;margin-bottom:48px;}
    .savings-badge{background:linear-gradient(135deg,#1a4f96,#2a6fc8);color:#fff;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:5px 14px;border-radius:999px;}
    .savings-title{font-family:"Fraunces",Georgia,serif;font-weight:350;font-size:clamp(28px,3vw,42px);color:#0d1020;letter-spacing:-.02em;margin:0;}
    .savings-title em{color:#2a6fc8;font-style:italic;}
    .savings-controls{background:#fff;border-radius:20px;border:1px solid rgba(26,79,150,.12);padding:32px;margin-bottom:36px;box-shadow:0 8px 32px rgba(13,31,60,.06);}
    .savings-slider-row{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
    .savings-slider-label{font-size:13px;font-weight:600;color:#1a4f96;white-space:nowrap;min-width:140px;}
    .savings-slider-track{flex:1;min-width:200px;position:relative;}
    .savings-slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:3px;background:linear-gradient(to right,#2a6fc8 var(--pct,50%),#dde8f8 var(--pct,50%));outline:none;cursor:pointer;}
    .savings-slider::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#1a4f96,#2a6fc8);border:3px solid #fff;box-shadow:0 2px 8px rgba(26,79,150,.3);cursor:pointer;transition:transform .15s;}
    .savings-slider::-webkit-slider-thumb:hover{transform:scale(1.2);}
    .savings-slider::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#1a4f96,#2a6fc8);border:3px solid #fff;box-shadow:0 2px 8px rgba(26,79,150,.3);cursor:pointer;}
    .savings-val-bubble{background:#1a4f96;color:#fff;font-size:13px;font-weight:700;padding:4px 12px;border-radius:999px;white-space:nowrap;min-width:70px;text-align:center;}
    .savings-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:36px;}
    @media(max-width:700px){.savings-grid{grid-template-columns:1fr;}}
    .savings-card{background:#fff;border-radius:16px;border:1px solid rgba(26,79,150,.1);padding:24px;box-shadow:0 4px 16px rgba(13,31,60,.05);transition:transform .3s,box-shadow .3s;}
    .savings-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(13,31,60,.12);}
    .savings-card-label{font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5f7197;margin-bottom:8px;}
    .savings-card-role{font-size:15px;font-weight:600;color:#1a4f96;margin-bottom:4px;}
    .savings-card-rate{font-size:12px;color:#7e93b8;margin-bottom:16px;}
    .savings-card-numbers{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
    .savings-yr{text-align:center;}
    .savings-yr-label{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#9fb2d4;margin-bottom:4px;}
    /* Animated border for numbers in slider area */
    @keyframes borderPulse{
      0%{border-color:#c01c1c;box-shadow:0 0 0 0 rgba(192,28,28,.2);}
      50%{border-color:#2a6fc8;box-shadow:0 0 0 6px rgba(42,111,200,.1);}
      100%{border-color:#c01c1c;box-shadow:0 0 0 0 rgba(192,28,28,.2);}
    }
    .savings-yr-num{font-size:clamp(15px,1.6vw,20px);font-weight:700;color:#0d1020;background:#f0f5ff;border-radius:10px;padding:8px 4px;border:2px solid #c01c1c;animation:borderPulse 2.5s ease-in-out infinite;transition:color .3s;}
    .savings-yr-num.highlight{color:#1a4f96;}
    .savings-total-row{background:linear-gradient(135deg,#1a4f96,#2a6fc8);border-radius:20px;padding:28px 36px;color:#fff;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;box-shadow:0 12px 40px rgba(26,79,150,.3);}
    .savings-total-label{font-size:13px;font-weight:500;opacity:.8;margin-bottom:4px;}
    .savings-total-num{font-size:clamp(24px,3vw,38px);font-weight:700;letter-spacing:-.02em;}
    .savings-ramp-note{font-size:11px;opacity:.7;margin-top:4px;}
    .savings-yr-cols{display:flex;gap:20px;flex-wrap:wrap;}
    .savings-yr-col{text-align:center;}
    .savings-yr-col-label{font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;opacity:.7;margin-bottom:4px;}
    .savings-yr-col-num{font-size:clamp(18px,2vw,28px);font-weight:700;border:2px solid rgba(255,255,255,.5);border-radius:12px;padding:6px 14px;animation:borderPulseWhite 2.5s ease-in-out infinite;}
    @keyframes borderPulseWhite{
      0%{border-color:rgba(255,100,100,.7);box-shadow:0 0 0 0 rgba(255,100,100,.2);}
      50%{border-color:rgba(100,180,255,.9);box-shadow:0 0 0 6px rgba(100,180,255,.15);}
      100%{border-color:rgba(255,100,100,.7);box-shadow:0 0 0 0 rgba(255,100,100,.2);}
    }
    .savings-margin-note{font-size:11px;color:#9fb2d4;margin-top:16px;text-align:center;}
`;

const INDIA_SAVINGS_HTML = `
<section class="savings-section" id="india-savings">
  <div class="savings-wrap">
    <div class="savings-hd">
      <span class="savings-badge">💰 Cost Advantage</span>
      <h2 class="savings-title">What India saves Bose, <em>year on year</em></h2>
    </div>

    <div class="savings-controls">
      <div class="savings-slider-row">
        <span class="savings-slider-label">🧑‍💼 Headcount</span>
        <div class="savings-slider-track">
          <input type="range" class="savings-slider" id="hc-slider" min="100" max="800" step="10" value="400">
        </div>
        <span class="savings-val-bubble" id="hc-val">400 FTEs</span>
      </div>
    </div>

    <div class="savings-grid">
      <div class="savings-card">
        <div class="savings-card-label">Function</div>
        <div class="savings-card-role">GR&amp;D</div>
        <div class="savings-card-rate">~$110K / FTE / yr vs US baseline</div>
        <div class="savings-card-numbers">
          <div class="savings-yr">
            <div class="savings-yr-label">Year 1 · 55%</div>
            <div class="savings-yr-num" id="grd-y1">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 2 · 92%</div>
            <div class="savings-yr-num" id="grd-y2">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 3 · 100%</div>
            <div class="savings-yr-num" id="grd-y3">—</div>
          </div>
        </div>
      </div>
      <div class="savings-card">
        <div class="savings-card-label">Function</div>
        <div class="savings-card-role">IT</div>
        <div class="savings-card-rate">~$95K / FTE / yr vs US baseline</div>
        <div class="savings-card-numbers">
          <div class="savings-yr">
            <div class="savings-yr-label">Year 1 · 55%</div>
            <div class="savings-yr-num" id="it-y1">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 2 · 92%</div>
            <div class="savings-yr-num" id="it-y2">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 3 · 100%</div>
            <div class="savings-yr-num" id="it-y3">—</div>
          </div>
        </div>
      </div>
      <div class="savings-card">
        <div class="savings-card-label">Function</div>
        <div class="savings-card-role">GBS</div>
        <div class="savings-card-rate">~$60K / FTE / yr vs US baseline</div>
        <div class="savings-card-numbers">
          <div class="savings-yr">
            <div class="savings-yr-label">Year 1 · 55%</div>
            <div class="savings-yr-num" id="gbs-y1">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 2 · 92%</div>
            <div class="savings-yr-num" id="gbs-y2">—</div>
          </div>
          <div class="savings-yr">
            <div class="savings-yr-label">Year 3 · 100%</div>
            <div class="savings-yr-num" id="gbs-y3">—</div>
          </div>
        </div>
      </div>
    </div>

    <div class="savings-total-row">
      <div>
        <div class="savings-total-label">Blended Total Savings (incl. 15% ConglomerateIT margin)</div>
        <div class="savings-total-num" id="total-blended">—</div>
        <div class="savings-ramp-note">Ramp: 55% Y1 → 92% Y2 → 100% Y3</div>
      </div>
      <div class="savings-yr-cols">
        <div class="savings-yr-col">
          <div class="savings-yr-col-label">Year 1</div>
          <div class="savings-yr-col-num" id="total-y1">—</div>
        </div>
        <div class="savings-yr-col">
          <div class="savings-yr-col-label">Year 2</div>
          <div class="savings-yr-col-num" id="total-y2">—</div>
        </div>
        <div class="savings-yr-col">
          <div class="savings-yr-col-label">Year 3</div>
          <div class="savings-yr-col-num" id="total-y3">—</div>
        </div>
      </div>
    </div>
    <p class="savings-margin-note">* Savings shown are Bose net savings after ConglomerateIT's 15% management margin. Headcount split assumed: 40% GR&amp;D · 35% IT · 25% GBS.</p>
  </div>
</section>

<script>
(function(){
  var GRD_RATE = 110000, IT_RATE = 95000, GBS_RATE = 60000;
  var MARGIN   = 0.85; // 15% margin to ConglomerateIT → Bose saves 85% of delta
  var RAMP     = [0.55, 0.92, 1.00];
  var SPLIT    = { grd: 0.40, it: 0.35, gbs: 0.25 };

  function fmt(n){ return '$' + (n/1e6).toFixed(1) + 'M'; }
  function fmtM(n){ return '$' + (n/1e6).toFixed(2) + 'M'; }

  function calcSavings(hc){
    var grd = Math.round(hc * SPLIT.grd);
    var it  = Math.round(hc * SPLIT.it);
    var gbs = hc - grd - it;
    var result = { grd:[], it:[], gbs:[], totals:[] };
    for(var i=0;i<3;i++){
      var r = RAMP[i];
      result.grd.push(grd * GRD_RATE * r * MARGIN);
      result.it.push(it  * IT_RATE  * r * MARGIN);
      result.gbs.push(gbs * GBS_RATE * r * MARGIN);
      result.totals.push(result.grd[i] + result.it[i] + result.gbs[i]);
    }
    return result;
  }

  function update(){
    var hc = parseInt(document.getElementById('hc-slider').value, 10);
    var pct = ((hc - 100) / (800 - 100)) * 100;
    document.getElementById('hc-slider').style.setProperty('--pct', pct + '%');
    document.getElementById('hc-val').textContent = hc + ' FTEs';
    var s = calcSavings(hc);
    ['grd','it','gbs'].forEach(function(fn){
      for(var y=1;y<=3;y++){
        var el = document.getElementById(fn+'-y'+y);
        if(el) el.textContent = fmtM(s[fn][y-1]);
      }
    });
    for(var y=1;y<=3;y++){
      var el = document.getElementById('total-y'+y);
      if(el) el.textContent = fmt(s.totals[y-1]);
    }
    var three = s.totals[0]+s.totals[1]+s.totals[2];
    var el = document.getElementById('total-blended');
    if(el) el.textContent = fmt(three) + ' over 3 years';
  }

  document.getElementById('hc-slider').addEventListener('input', update);
  update();
})();
</script>
`;

// ── RECOMMENDED BADGE CSS ─────────────────────────────────────────────────────
const RECOMMENDED_BADGE_CSS = `
    /* ===== RECOMMENDED PARTNER BADGE (consistent style) ===== */
    .rec-badge{
      display:inline-flex;align-items:center;gap:6px;
      background:linear-gradient(135deg,rgba(26,79,150,.12),rgba(42,111,200,.08));
      border:1.5px solid rgba(26,79,150,.25);border-radius:999px;
      padding:4px 12px;font-size:10px;font-weight:600;letter-spacing:.12em;
      text-transform:uppercase;color:#1a4f96;margin-bottom:12px;
      backdrop-filter:blur(4px);
    }
    .rec-badge::before{content:"★";font-size:11px;}
    /* ctrcard opt badge */
    .ctrcard.opt{border-color:rgba(26,79,150,.3) !important;position:relative;}
    .ctrcard.opt::before{
      content:"★ Recommended Partner Model";
      display:inline-flex;align-items:center;
      background:linear-gradient(135deg,rgba(26,79,150,.12),rgba(42,111,200,.08));
      border:1.5px solid rgba(26,79,150,.25);border-radius:999px;
      padding:4px 12px;font-size:10px;font-weight:600;letter-spacing:.12em;
      text-transform:uppercase;color:#1a4f96;margin-bottom:12px;
      position:absolute;top:-14px;left:16px;white-space:nowrap;
      backdrop-filter:blur(4px);
    }
`;

// ── READ + DECRYPT ────────────────────────────────────────────────────────────
console.log('Reading Main.html...');
const mainHtml = readFileSync('Main.html', 'utf8');

const saltMatch = mainHtml.match(/salt:\s*"([^"]+)"/);
const ivMatch   = mainHtml.match(/\biv:\s*"([^"]+)"/);
const iterMatch = mainHtml.match(/iter:\s*(\d+)/);
const ctMatch   = mainHtml.match(/ct:\s*"([A-Za-z0-9+/=\n]+?)"\s*(?:,|\n\s*})/s);

if (!saltMatch || !ivMatch || !iterMatch || !ctMatch) {
  console.error('Could not extract ENC fields!');
  process.exit(1);
}

const encSalt = saltMatch[1];
const encIv   = ivMatch[1];
const encIter = parseInt(iterMatch[1], 10);
const encCt   = ctMatch[1].replace(/\s/g, '');

console.log(`Salt: ${encSalt}, IV: ${encIv}, Iter: ${encIter}, CT length: ${encCt.length}`);

console.log('Decrypting...');
let decrypted;
try {
  decrypted = await decryptContent(encSalt, encIv, encCt, PASSWORD, encIter);
  console.log('✅ Decryption successful! Content length:', decrypted.length);
} catch (e) {
  console.error('❌ Decryption failed:', e.message);
  process.exit(1);
}

// Save decrypted for inspection
writeFileSync('decrypted_content.html', decrypted, 'utf8');
console.log('Saved decrypted_content.html');

// ── PATCH THE DECRYPTED CONTENT ───────────────────────────────────────────────
console.log('Patching decrypted content...');
let patched = decrypted;

// 1. Add savings calculator CSS to existing <style> block
if (patched.includes('</style>')) {
  patched = patched.replace('</style>', INDIA_SAVINGS_SECTION + '\n    </style>');
  console.log('  ✅ Added savings CSS');
}

// 2. Add recommended badge CSS
if (patched.includes('</style>')) {
  patched = patched.replace('</style>', RECOMMENDED_BADGE_CSS + '\n    </style>');
  console.log('  ✅ Added badge CSS');
}

// 3. Insert savings calculator section before the first <section> or after the hero
// Try to find a good insertion point - after id="hero" or similar
const heroEndPatterns = [
  /<\/section>\s*\n\s*(?=.*?id=["'](?:cost|pricing|financial|savings|commercial)/i,
  /(<section[^>]*id=["'](?:trust|proof|cost|commercial|partner)[^>]*>)/i,
];

let inserted = false;
// Try inserting before section with id containing cost/commercial
const sectionMatch = patched.match(/(<section[^>]*id=["'][^"']*(?:trust|commercial|cost|partner|legal)[^"']*["'][^>]*>)/i);
if (sectionMatch) {
  patched = patched.replace(sectionMatch[0], INDIA_SAVINGS_HTML + '\n' + sectionMatch[0]);
  inserted = true;
  console.log('  ✅ Inserted savings section before matching section');
}

if (!inserted) {
  // Fallback: insert before </body>
  patched = patched.replace('</body>', INDIA_SAVINGS_HTML + '\n</body>');
  console.log('  ✅ Inserted savings section before </body>');
}

// Save patched for inspection
writeFileSync('patched_content.html', patched, 'utf8');
console.log('Saved patched_content.html for inspection');

// ── RE-ENCRYPT ────────────────────────────────────────────────────────────────
console.log('Re-encrypting with new salt/IV...');
const newEnc = await encryptContent(patched, PASSWORD, encIter);
console.log('✅ Re-encrypted! New CT length:', newEnc.ct.length);

// ── UPDATE MAIN.HTML ──────────────────────────────────────────────────────────
console.log('Updating Main.html...');

// Also add CGIT logo to lock screen
let updatedMainHtml = mainHtml;

// Update ENC object with new values
updatedMainHtml = updatedMainHtml.replace(
  /var ENC\s*=\s*\{[\s\S]*?\};/,
  `var ENC = {\n        salt: "${newEnc.salt}",\n        iv: "${newEnc.iv}",\n        iter: ${newEnc.iter},\n        ct: "${newEnc.ct}"\n      };`
);

// Add CGIT logo to lock screen footer
updatedMainHtml = updatedMainHtml.replace(
  /(<div class="ft">[\s\S]*?<\/div>)/,
  `<div class="ft">
        <img src="./ConglomerateIT Banner Logo.png" alt="ConglomerateIT" style="height:22px;opacity:.55;display:block;margin:0 auto 10px;filter:invert(1) brightness(1.5);">
        Confidential · Bose Procurement · ConglomerateIT
      </div>`
);

// Update lock screen CSS for logo
updatedMainHtml = updatedMainHtml.replace(
  '.ft {',
  `.ft {
        text-align: center;`
);

writeFileSync('Main.html', updatedMainHtml, 'utf8');
console.log('✅ Main.html updated successfully!');
console.log('Done! Summary:');
console.log('  - Decrypted, patched & re-encrypted Main.html');
console.log('  - Added India savings YoY calculator with headcount slider (100–800)');
console.log('  - Added animated border on slider number cells (red→blue)');
console.log('  - Added Recommended Partner Model badge CSS');
console.log('  - Added ConglomerateIT logo to encryption page');
