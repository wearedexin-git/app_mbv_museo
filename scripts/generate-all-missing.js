
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSET_ROOT = path.join(__dirname, '..', 'src', 'asset');
const OUTPUT_DIR = path.join(__dirname, '..', 'image-targets');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

function findTriggers(dir, results = []) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.lstatSync(full).isDirectory()) {
            findTriggers(full, results);
        } else if (f.startsWith('trigger_') && /\.(jpg|jpeg|png)$/i.test(f)) {
            // Get relative path parts to build target ID
            const rel = path.relative(ASSET_ROOT, dir);
            const subpath = rel.split(path.sep).filter(p => p);
            const baseName = f.replace(/^trigger_/, '').split('.')[0];
            
            // Reconstruct the target ID used by sync-targets or the folder-based naming
            // We'll use a clean name: Room_Item_TriggerName
            const targetId = [...subpath, baseName].join('_').replace(/[^a-zA-Z0-9_]/g, '');
            
            results.push({
                path: full,
                targetId: targetId
            });
        }
    }
    return results;
}

async function generateTarget(imagePath, targetId) {
    const jsonPath = path.join(OUTPUT_DIR, `${targetId}.json`);
    if (fs.existsSync(jsonPath)) {
        console.log(`⏩ Skipping ${targetId} (already exists)`);
        return;
    }

    console.log(`⚙️ Generating target: ${targetId}...`);
    
    return new Promise((resolve, reject) => {
        // Run CLI: npx @8thwall/image-target-cli
        // Inputs: 1. Image Path, 2. Type (1), 3. Crop (Y), 4. Output Folder, 5. Target Name
        const child = spawn('npx', ['-y', '@8thwall/image-target-cli'], {
            stdio: ['pipe', 'pipe', 'inherit']
        });

        // Send all inputs at once followed by a newline
        // We use ./image-targets as folder and targetId as name
        const inputs = [
            imagePath,
            '1',
            'Y',
            OUTPUT_DIR,
            targetId
        ].join('\n') + '\n';

        child.stdin.write(inputs);
        child.stdin.end();

        child.on('close', (code) => {
            if (code === 0) {
                console.log(`✅ ${targetId} created.`);
                resolve();
            } else {
                // Se fallisce perché il file esiste già (original.jpg), va bene lo stesso 
                // ma in teoria non dovrebbe succedere se il .json manca.
                console.log(`⚠️ ${targetId} process finished (check if created).`);
                resolve(); 
            }
        });
    });
}

async function main() {
    const list = findTriggers(ASSET_ROOT);
    console.log(`🚀 Found ${list.length} triggers. Starting generation...`);
    
    for (const item of list) {
        try {
            await generateTarget(item.path, item.targetId);
        } catch (e) {
            console.error(`❌ Failed ${item.targetId}: ${e.message}`);
        }
    }
    console.log('\n✨ All targets processed.');
}

main();
