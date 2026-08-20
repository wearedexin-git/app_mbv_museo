import { AppLang, ErrorKind, getErrorMessage } from './error-messages';

export type ErrorRecoveryOptions = {
  getLang: () => AppLang;
  /** true se il carosello AR è aperto (offline → blocco soft) */
  isCarouselOpen?: () => boolean;
  /** timeout load critici (ms) */
  timeoutMs?: number;
  /** soglia hang / tracking perso (ms) */
  hangMs?: number;
};

type ReportPayload = {
  type: ErrorKind;
  message: string;
  detail?: string;
  at: string;
};

declare global {
  interface Window {
    __mbvReportError?: (payload: ReportPayload) => void;
    ErrorRecovery?: typeof ErrorRecoveryApi;
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_HANG_MS = 10_000;

class ErrorRecoveryController {
  private getLang: () => AppLang = () => 'it';
  private isCarouselOpen: () => boolean = () => false;
  private timeoutMs = DEFAULT_TIMEOUT_MS;
  private hangMs = DEFAULT_HANG_MS;

  private banner: HTMLElement | null = null;
  private msgEl: HTMLElement | null = null;
  private titleEl: HTMLElement | null = null;
  private reloadBtn: HTMLElement | null = null;
  private closeBtn: HTMLElement | null = null;
  private loader: HTMLElement | null = null;
  private loaderText: HTMLElement | null = null;

  private currentKind: ErrorKind | null = null;
  private lastHeartbeat = 0;
  private heartbeatStarted = false;
  private watchdogTimer: number | null = null;
  private trackingLostSince: number | null = null;
  private trackingLostTimer: number | null = null;
  private bootTimerSoft: number | null = null;
  private bootTimerHard: number | null = null;
  private interactionBlocked = false;
  private started = false;

  init(opts: ErrorRecoveryOptions) {
    this.configure(opts);

    if (this.started) return;
    this.started = true;

    this.banner = document.getElementById('error-recovery-banner');
    this.msgEl = document.getElementById('error-recovery-msg');
    this.titleEl = document.getElementById('error-recovery-title');
    this.reloadBtn = document.getElementById('error-reload-btn');
    this.closeBtn = document.getElementById('error-close-btn');
    this.loader = document.getElementById('recovery-loader');
    this.loaderText = document.getElementById('recovery-loader-text');

    this.reloadBtn?.addEventListener('click', () => this.reload());
    this.closeBtn?.addEventListener('click', () => this.hide());

    window.addEventListener('offline', () => {
      this.show('offline');
      if (this.isCarouselOpen()) this.setInteractionBlocked(true);
    });

    window.addEventListener('online', () => {
      void this.autoRetryAfterOnline();
    });

    window.addEventListener('error', (e) => {
      // Ignora Script error. cross-origin da xr.js
      if (!e.message || e.message === 'Script error.') return;
      if (e.filename && /xr\.js|runtime\.js|xr-slam/i.test(e.filename)) {
        if (!(window as any).XR8) this.show('xr_boot', e.message);
        return;
      }
      this.show('js_fatal', e.message);
    });

    window.addEventListener('unhandledrejection', (e) => {
      const reason = (e.reason && (e.reason.message || String(e.reason))) || 'unhandledrejection';
      if (/Script error/i.test(reason)) return;
      this.show('js_fatal', reason);
    });

    this.startBootWatch();
    this.startWatchdog();
    this.lastHeartbeat = performance.now();
  }

  /** Aggiorna getter (lingua / stato carosello) anche dopo il primo init. */
  configure(opts: Partial<ErrorRecoveryOptions>) {
    if (opts.getLang) this.getLang = opts.getLang;
    if (opts.isCarouselOpen) this.isCarouselOpen = opts.isCarouselOpen;
    if (opts.timeoutMs) this.timeoutMs = opts.timeoutMs;
    if (opts.hangMs) this.hangMs = opts.hangMs;
  }

  /** Aggiorna copy se l’utente cambia lingua con banner aperto. */
  syncLanguage() {
    if (this.currentKind) this.applyCopy(this.currentKind);
    if (this.loader && !this.loader.classList.contains('hidden')) {
      const msg = getErrorMessage(this.currentKind || 'offline', this.getLang());
      if (this.loaderText) this.loaderText.textContent = msg.loading;
    }
  }

  show(kind: ErrorKind, detail?: string) {
    this.currentKind = kind;
    this.applyCopy(kind);
    // In sviluppo, mostra il dettaglio reale nel banner (aiuta il debug su device)
    if (detail && this.msgEl && /localhost|127\.|192\.168\.|ngrok|loca\.lt|trycloudflare/i.test(location.hostname)) {
      const base = this.msgEl.textContent || '';
      const short = String(detail).slice(0, 180);
      this.msgEl.textContent = `${base}\n\n(${short})`;
    }
    this.banner?.classList.remove('hidden');
    this.hideLoader();
    this.report(kind, detail);
  }

  hide() {
    this.banner?.classList.add('hidden');
    this.currentKind = null;
    this.setInteractionBlocked(false);
  }

  reload() {
    location.reload();
  }

  heartbeat() {
    this.heartbeatStarted = true;
    this.lastHeartbeat = performance.now();
  }

  noteTrackingLost() {
    if (this.trackingLostSince != null) return;
    this.trackingLostSince = performance.now();
    if (this.trackingLostTimer != null) window.clearTimeout(this.trackingLostTimer);
    this.trackingLostTimer = window.setTimeout(() => {
      if (this.trackingLostSince == null) return;
      if (!this.isCarouselOpen()) return;
      this.show('tracking_lost_long');
    }, this.hangMs);
  }

  noteTrackingRestored() {
    this.trackingLostSince = null;
    if (this.trackingLostTimer != null) {
      window.clearTimeout(this.trackingLostTimer);
      this.trackingLostTimer = null;
    }
    if (this.currentKind === 'tracking_lost_long') this.hide();
  }

  reportAssetLoadError(detail?: string) {
    this.show('asset_load', detail);
  }

  reportTimeout(detail?: string) {
    this.show('slow_or_timeout', detail);
  }

  reportCameraError(detail?: string) {
    this.show('camera', detail);
  }

  reportXrBoot(detail?: string) {
    this.show('xr_boot', detail);
  }

  isBlocked(): boolean {
    return this.interactionBlocked;
  }

  async fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await fetch(input, { ...init, signal: controller.signal });
      if (!res.ok) {
        if (!navigator.onLine) this.show('offline', String(input));
        else this.show('asset_load', `${res.status} ${input}`);
      }
      return res;
    } catch (err: any) {
      if (!navigator.onLine || err?.name === 'TypeError') {
        this.show('offline', String(input));
      } else if (err?.name === 'AbortError') {
        this.reportTimeout(String(input));
      } else {
        this.show('asset_load', String(err?.message || err));
      }
      throw err;
    } finally {
      window.clearTimeout(timer);
    }
  }

  /** Promise con timeout generico (texture, ecc.). */
  withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let settled = false;
      const timer = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        this.reportTimeout(label);
        reject(new Error(`timeout:${label}`));
      }, this.timeoutMs);
      promise
        .then((v) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          resolve(v);
        })
        .catch((err) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          if (!navigator.onLine) this.show('offline', label);
          else this.show('asset_load', label);
          reject(err);
        });
    });
  }

  private applyCopy(kind: ErrorKind) {
    const msg = getErrorMessage(kind, this.getLang());
    if (this.titleEl) this.titleEl.textContent = msg.title;
    if (this.msgEl) this.msgEl.textContent = msg.body;
    if (this.reloadBtn) this.reloadBtn.textContent = msg.reload;
    if (this.closeBtn) this.closeBtn.textContent = msg.close;
  }

  private showLoader(kind: ErrorKind = 'offline') {
    const msg = getErrorMessage(kind, this.getLang());
    if (this.loaderText) this.loaderText.textContent = msg.loading;
    this.loader?.classList.remove('hidden');
  }

  private hideLoader() {
    this.loader?.classList.add('hidden');
  }

  private setInteractionBlocked(blocked: boolean) {
    this.interactionBlocked = blocked;
    document.body.classList.toggle('mbv-recovery-blocked', blocked);
  }

  private async autoRetryAfterOnline() {
    this.showLoader(this.currentKind || 'offline');
    // Piccolo delay: lascia stabilizzare la rete
    await new Promise((r) => setTimeout(r, 600));
    try {
      const probe = await this.fetchWithTimeout('./manifest.json', { cache: 'no-store' });
      if (probe.ok) {
        this.hideLoader();
        this.hide();
        this.setInteractionBlocked(false);
        return;
      }
    } catch {
      // banner già mostrato da fetchWithTimeout
    }
    this.hideLoader();
    if (!this.currentKind) this.show('offline');
  }

  private startBootWatch() {
    this.bootTimerSoft = window.setTimeout(() => {
      if ((window as any).XR8) return;
      this.reportXrBoot('soft-wait');
    }, 15_000);

    this.bootTimerHard = window.setTimeout(() => {
      if ((window as any).XR8) return;
      this.reportXrBoot('hard-fail');
    }, 45_000);

    const clearBoot = () => {
      if (this.bootTimerSoft != null) window.clearTimeout(this.bootTimerSoft);
      if (this.bootTimerHard != null) window.clearTimeout(this.bootTimerHard);
      this.bootTimerSoft = null;
      this.bootTimerHard = null;
      if (this.currentKind === 'xr_boot') this.hide();
    };

    window.addEventListener('xrloaded', clearBoot);
    const poll = window.setInterval(() => {
      if ((window as any).XR8) {
        window.clearInterval(poll);
        clearBoot();
      }
    }, 500);
  }

  private startWatchdog() {
    this.watchdogTimer = window.setInterval(() => {
      // Watchdog solo dopo il primo frame della pipeline AR
      if (!this.heartbeatStarted) return;
      const gap = performance.now() - this.lastHeartbeat;
      if (gap >= this.hangMs) {
        this.show('watchdog', `gap=${Math.round(gap)}ms`);
        // Evita spam: reset heartbeat così riparte il conteggio dopo show
        this.lastHeartbeat = performance.now();
      }
    }, 2000);
  }

  private report(kind: ErrorKind, detail?: string) {
    const payload: ReportPayload = {
      type: kind,
      message: getErrorMessage(kind, this.getLang()).title,
      detail,
      at: new Date().toISOString(),
    };
    console.warn('[MBV:error]', payload);
    try {
      window.__mbvReportError?.(payload);
    } catch {
      /* ignore */
    }
  }
}

const ErrorRecoveryApi = new ErrorRecoveryController();
export const ErrorRecovery = ErrorRecoveryApi;
export default ErrorRecoveryApi;
