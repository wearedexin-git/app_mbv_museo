/**
 * Rigenera image-target 8th Wall forzando la sovrascrittura.
 * Uso: node scripts/generate-targets-force.js [targetId...]
 * Senza argomenti: tutti i trigger_* sotto src/asset (esclusi *_qr*).
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSET_ROOT = path.join(__dirname, '..', 'src', 'asset');
const OUTPUT_DIR = path.join(__dirname, '..', 'image-targets');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

function findTriggers(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.lstatSync(full).isDirectory()) {
      findTriggers(full, results);
      continue;
    }
    if (!f.startsWith('trigger_') || !/\.(jpg|jpeg|png)$/i.test(f)) continue;
    // Solo foto (non QR): la rigenerazione QR non è in scope
    if (/_qr\./i.test(f) || /_qr$/i.test(f.replace(/\.[^.]+$/, ''))) continue;

    const rel = path.relative(ASSET_ROOT, dir);
    const subpath = rel.split(path.sep).filter(Boolean);
    const baseName = f.replace(/^trigger_/, '').replace(/\.[^.]+$/, '');
    const targetId = [...subpath, baseName].join('_').replace(/[^a-zA-Z0-9_]/g, '');
    results.push({ path: full, targetId });
  }
  return results;
}

function removeExisting(targetId) {
  const prefixes = [
    `${targetId}.json`,
    `${targetId}_cropped.jpg`,
    `${targetId}_luminance.jpg`,
    `${targetId}_original.jpg`,
    `${targetId}_thumbnail.jpg`,
  ];
  for (const name of prefixes) {
    const p = path.join(OUTPUT_DIR, name);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

function generateTarget(imagePath, targetId) {
  removeExisting(targetId);
  console.log(`⚙️ Generating target: ${targetId}...`);

  return new Promise((resolve) => {
    const child = spawn('npx', ['-y', '@8thwall/image-target-cli'], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    const inputs = [imagePath, '1', 'Y', OUTPUT_DIR, targetId].join('\n') + '\n';
    child.stdin.write(inputs);
    child.stdin.end();

    child.on('close', (code) => {
      const jsonPath = path.join(OUTPUT_DIR, `${targetId}.json`);
      if (fs.existsSync(jsonPath)) {
        console.log(`✅ ${targetId} created.`);
      } else {
        console.log(`⚠️ ${targetId} finished (code=${code}) — verifica output.`);
      }
      resolve();
    });
  });
}

async function main() {
  const filter = new Set(process.argv.slice(2));
  let list = findTriggers(ASSET_ROOT);
  if (filter.size > 0) {
    list = list.filter((t) => filter.has(t.targetId));
  }

  console.log(`\n🔍 Generating ${list.length} photo target(s)...\n`);
  for (const t of list) {
    await generateTarget(t.path, t.targetId);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
