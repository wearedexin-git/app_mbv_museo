const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ASSET_ROOT = path.join(PROJECT_ROOT, 'src', 'asset');
const DATA_OUTPUT = path.join(PROJECT_ROOT, 'src', 'config', 'targetsData.json');

const allConfigs = [];
const appImports = [];
const appVarNames = [];

/** Rimuove un gruppo RTF bilanciato che inizia con {\controlWord */
function removeRtfGroup(rtf, controlWord) {
  const startToken = `{\\${controlWord}`;
  let result = rtf;
  let idx = result.indexOf(startToken);
  while (idx !== -1) {
    let depth = 0;
    let end = -1;
    for (let i = idx; i < result.length; i++) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) break;
    result = result.slice(0, idx) + result.slice(end + 1);
    idx = result.indexOf(startToken);
  }
  return result;
}

function decodeRTF(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    let content = fs.readFileSync(filePath, 'utf8');

    // Solo metadati: non toccare il gruppo root {\rtf1 ... testo}
    content = removeRtfGroup(content, 'fonttbl');
    content = removeRtfGroup(content, 'colortbl');
    content = removeRtfGroup(content, 'stylesheet');
    content = removeRtfGroup(content, 'info');
    // Gruppi ignoti {\*....}
    let star = content.indexOf('{\\*\\');
    while (star !== -1) {
      let depth = 0;
      let end = -1;
      for (let j = star; j < content.length; j++) {
        if (content[j] === '{') depth++;
        else if (content[j] === '}') {
          depth--;
          if (depth === 0) {
            end = j;
            break;
          }
        }
      }
      if (end < 0) break;
      content = content.slice(0, star) + content.slice(end + 1);
      star = content.indexOf('{\\*\\');
    }

    let text = content
      .replace(/\\\r?\n/g, ' ')
      .replace(/\\'([0-9a-f]{2})/gi, (_, hex) => {
        const h = hex.toLowerCase();
        const map = {
          '91': "'", '92': "'", '93': '"', '94': '"',
          e8: 'è', e9: 'é', e0: 'à', e1: 'á', f9: 'ù', ec: 'ì', f2: 'ò',
          c8: 'È', c9: 'É', c0: 'À', d9: 'Ù', cc: 'Ì', d2: 'Ò',
        };
        return map[h] || String.fromCharCode(parseInt(h, 16));
      })
      .replace(/\\u(-?\d+)\??/g, (_, n) => {
        const code = parseInt(n, 10);
        return code > 0 ? String.fromCharCode(code) : '';
      })
      .replace(/\\par(?![a-z])/gi, '\n')
      .replace(/\\[a-z]+(-?\d+)?[ ]?/gi, '')
      .replace(/[{}]/g, '')
      .replace(/\\/g, '')
      .replace(/TimesNewRoman[A-Za-z0-9]*;?/gi, '')
      .replace(/^[;\*\s]+/gm, '')
      .replace(/;{2,}/g, ' ')
      .replace(/\r/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n+/g, ' ')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();

    text = text.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ“"«]+/, '').trim();
    return text || null;
  } catch (e) {
    return null;
  }
}

function getSubDir(parent, name) {
    if (!fs.existsSync(parent)) return null;
    const files = fs.readdirSync(parent);
    const found = files.find(f => f.toLowerCase() === name.toLowerCase());
    return found ? path.join(parent, found) : null;
}

function findTriggerFolders(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const files = fs.readdirSync(dir);
  const triggerImage = files.find(f => !fs.lstatSync(path.join(dir, f)).isDirectory() && (f.startsWith('trigger_') || f.endsWith('.jpg') || f.endsWith('.png')) && !f.startsWith('.'));
  const subDirs = files.filter(f => fs.lstatSync(path.join(dir, f)).isDirectory());
  const hasContentDirs = subDirs.some(d => ['audio', 'images', 'testi', 'quiz'].includes(d.toLowerCase()));

  if (triggerImage && hasContentDirs) {
    results.push({ folderPath: dir, imageFile: triggerImage });
  } else {
    subDirs.forEach(subDir => {
      if (subDir !== 'node_modules' && !subDir.startsWith('.')) {
        results = results.concat(findTriggerFolders(path.join(dir, subDir)));
      }
    });
  }
  return results;
}

const quizMapping = {
    'armatura': 'bv-quiz-armatura',
    'bevilacqua': 'bv-quiz-bevilacqua',
    'camino': 'bv-quiz-camino',
    'lesena': 'bv-quiz-lesena',
    'lasena': 'bv-quiz-lesena',
    'portiera': 'bv-quiz-portiera',
    'serliana': 'bv-quiz-serliana',
    'teschio': 'bv-quiz-teschio',
    'vasca': 'bv-quiz-vasca',
    'bagno': 'bv-quiz-vasca',
    'vetrina': 'bv-quiz-vetrina',
    'credenza': 'bv-quiz-vetrina'
};

const getQuizId = (name) => {
    const lowerName = name.toLowerCase();
    for (const [key, id] of Object.entries(quizMapping)) {
      if (lowerName.includes(key)) return id;
    }
    return null;
};

const triggerFolders = findTriggerFolders(ASSET_ROOT);
console.log(`\n🔍 Syncing ${triggerFolders.length} content folders...\n`);

const seenTriggers = new Set();

triggerFolders.forEach((targetFolder) => {
  const triggerDir = targetFolder.folderPath;
  const relPath = path.relative(ASSET_ROOT, triggerDir);
  const baseTargetId = relPath.replace(/\//g, '_').replace(/\\/g, '_');

  const allTriggersInFolder = fs.readdirSync(triggerDir)
    .filter(f => !fs.lstatSync(path.join(triggerDir, f)).isDirectory() && 
                 f.startsWith('trigger_') && 
                 /\.(jpg|jpeg|png)$/i.test(f));

  const carouselDir = getSubDir(triggerDir, 'images');
  let carouselImages = [];
  if (carouselDir) {
    carouselImages = fs.readdirSync(carouselDir)
      .filter(f => (f.endsWith('.jpg') || f.endsWith('.png')) && !f.startsWith('.'))
      .map(f => `./asset/${relPath}/images/${f}`);
  }

  const getAudio = (lang) => {
    const audioDir = getSubDir(triggerDir, 'audio');
    if (!audioDir) return null;
    const langDir = getSubDir(audioDir, lang === 'it' ? 'ita' : 'en');
    if (!langDir) return null;
    const files = fs.readdirSync(langDir).filter(f => f.toLowerCase().endsWith('.mp3') && !f.startsWith('.'));
    return files.length > 0 ? `./asset/${relPath}/audio/${path.basename(langDir)}/${files[0]}` : null;
  };

  const audioIta = getAudio('it') || `./asset/${relPath}/audio/placeholder.mp3`;
  const audioEn = getAudio('en') || audioIta.replace('/ita/', '/en/');

  const getText = (lang) => {
    const testiDir = getSubDir(triggerDir, 'testi');
    if (!testiDir) return null;
    const langDir = getSubDir(testiDir, (lang === 'it' || lang === 'ita') ? 'ita' : 'en');
    if (langDir) {
        const files = fs.readdirSync(langDir).filter(f => f.toLowerCase().includes('.rtf') && !f.startsWith('.'));
        if (files.length > 0) return decodeRTF(path.join(langDir, files[0]));
    }
    return null;
  };

  const textIta = getText('it');
  const textEn = getText('en');
  const quizId = getQuizId(baseTargetId);

  allConfigs.push({
    id: baseTargetId,
    quizId,
    images: carouselImages.slice(0, 3),
    localization: {
      it: { infoText: textIta || `Dati mancanti in ${relPath}/it`, audioSrc: audioIta },
      en: { infoText: textEn || textIta || `Dati mancanti in ${relPath}/en`, audioSrc: audioEn }
    }
  });

  allTriggersInFolder.forEach(f => {
    const triggerBase = f.replace(/^trigger_/, '').split('.')[0];
    const fullTargetId = [...relPath.split(path.sep), triggerBase].join('_').replace(/[^a-zA-Z0-9_]/g, '');
    
    if (seenTriggers.has(fullTargetId)) return;
    seenTriggers.add(fullTargetId);

    const varName = `${fullTargetId.replace(/[^a-zA-Z0-9]/g, '')}Json`;
    appImports.push(`const ${varName} = require('../image-targets/${fullTargetId}.json');`);
    appVarNames.push(varName);
  });
});

fs.writeFileSync(DATA_OUTPUT, JSON.stringify(allConfigs, null, 2));

const APP_HELP_OUTPUT = path.join(PROJECT_ROOT, 'generated-config.json');
fs.writeFileSync(APP_HELP_OUTPUT, JSON.stringify({ 
    appImports: appImports.join('\n'), 
    appVarNames: appVarNames.join(', ')
}, null, 2));

console.log(`✅ Success! Data written to src/config/targetsData.json`);
