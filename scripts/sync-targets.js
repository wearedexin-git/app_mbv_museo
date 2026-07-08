const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ASSET_ROOT = path.join(PROJECT_ROOT, 'src', 'asset');
const DATA_OUTPUT = path.join(PROJECT_ROOT, 'src', 'config', 'targetsData.json');

const allConfigs = [];
const appImports = [];
const appVarNames = [];

function decodeRTF(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    let text = content
      .replace(/\{[^}]+\}/g, '')
      .replace(/\\[a-z0-9*-]+[ ]?/gi, '')
      .replace(/\\'([0-9a-f]{2})/g, (match, hex) => {
          const charCode = parseInt(hex, 16);
          if (hex === '92' || hex === '91') return "'";
          if (hex === '93' || hex === '94') return '"';
          if (hex === 'e8') return 'è';
          if (hex === 'e0') return 'à';
          if (hex === 'f9') return 'ù';
          if (hex === 'ec') return 'ì';
          if (hex === 'f2') return 'ò';
          return String.fromCharCode(charCode);
      })
      .replace(/[{} ]+/g, ' ')
      .trim();
    return text;
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
