import { targetConfigs } from './config/targetsManager';

// Deve combaciare con CACHE_NAME in src/sw.js: scriviamo nella stessa cache
// dinamica che il service worker legge in fase di fetch, così i file
// pre-scaricati risultano già "hit" al primo uso reale.
const CACHE_NAME = 'bagatti-ar-v4';
const CONCURRENCY = 4;

function collectAssetUrls(): string[] {
  const urls = new Set<string>();
  for (const cfg of targetConfigs) {
    for (const img of cfg.images || []) urls.add(img);
    const it = cfg.localization?.it?.audioSrc;
    const en = cfg.localization?.en?.audioSrc;
    if (it) urls.add(it);
    if (en) urls.add(en);
    if (cfg.quizId) urls.add(`./quizbase/${cfg.quizId}/questions.json`);
  }
  return Array.from(urls);
}

export interface PrecacheProgress {
  done: number;
  total: number;
  failed: string[];
}

async function fetchOne(cache: Cache, url: string): Promise<boolean> {
  try {
    const existing = await cache.match(url);
    if (existing) return true;
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) return false;
    await cache.put(url, res.clone());
    return true;
  } catch {
    return false;
  }
}

async function runPool(urls: string[], limit: number, worker: (url: string) => Promise<void>): Promise<void> {
  let idx = 0;
  const runners = new Array(Math.min(limit, urls.length)).fill(0).map(async () => {
    while (idx < urls.length) {
      const url = urls[idx++];
      await worker(url);
    }
  });
  await Promise.all(runners);
}

let running = false;

export const PwaPrecache = {
  isRunning: () => running,

  run(onProgress?: (p: PrecacheProgress) => void): Promise<PrecacheProgress> {
    if (running) return Promise.reject(new Error('Download già in corso'));
    if (!('caches' in window)) return Promise.reject(new Error('Cache API non disponibile'));

    running = true;
    const urls = collectAssetUrls();
    const total = urls.length;
    let done = 0;
    const failed: string[] = [];

    return caches
      .open(CACHE_NAME)
      .then((cache) =>
        runPool(urls, CONCURRENCY, async (url) => {
          const ok = await fetchOne(cache, url);
          if (!ok) failed.push(url);
          done += 1;
          if (onProgress) onProgress({ done, total, failed: [...failed] });
        })
      )
      .then(() => {
        running = false;
        return { done, total, failed };
      })
      .catch((err) => {
        running = false;
        throw err;
      });
  },
};
