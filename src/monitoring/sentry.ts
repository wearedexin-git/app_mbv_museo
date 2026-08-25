import * as Sentry from '@sentry/browser';
import { SENTRY_DSN as DSN_FILE } from '../config/sentry-dsn';
import type { ErrorKind } from '../error-messages';

type RecoveryPayload = {
  type: ErrorKind;
  message: string;
  detail?: string;
  at: string;
};

declare const __SENTRY_DSN__: string | undefined;
declare const __SENTRY_ENVIRONMENT__: string | undefined;

declare global {
  interface Window {
    __mbvErrorQueue?: RecoveryPayload[];
    __mbvReportError?: (payload: RecoveryPayload) => void;
    __mbvSentryReady?: boolean;
  }
}

const SKIP_KINDS: ErrorKind[] = ['offline'];

const LEVEL_BY_KIND: Record<ErrorKind, Sentry.SeverityLevel> = {
  js_fatal: 'error',
  xr_boot: 'error',
  camera: 'error',
  asset_load: 'warning',
  slow_or_timeout: 'warning',
  watchdog: 'warning',
  tracking_lost_long: 'info',
  offline: 'info',
};

function resolveDsn(): string {
  const fromBuild = typeof __SENTRY_DSN__ !== 'undefined' ? __SENTRY_DSN__ : '';
  return String(fromBuild || DSN_FILE || '').trim();
}

function resolveEnvironment(): string {
  if (typeof __SENTRY_ENVIRONMENT__ !== 'undefined' && __SENTRY_ENVIRONMENT__) {
    return __SENTRY_ENVIRONMENT__;
  }
  const host = typeof location !== 'undefined' ? location.hostname : '';
  if (/localhost|127\.|192\.168\.|ngrok|loca\.lt|trycloudflare/i.test(host)) {
    return 'development';
  }
  return 'production';
}

function reportRecovery(payload: RecoveryPayload) {
  if (!window.__mbvSentryReady) {
    window.__mbvErrorQueue = window.__mbvErrorQueue || [];
    window.__mbvErrorQueue.push(payload);
    return;
  }
  if (SKIP_KINDS.includes(payload.type)) {
    Sentry.addBreadcrumb({
      category: 'mbv.recovery',
      message: payload.type,
      level: 'info',
      data: payload,
    });
    return;
  }

  // js_fatal è già catturato dal SDK (onerror / unhandledrejection): evita doppioni.
  if (payload.type === 'js_fatal') {
    Sentry.setTag('mbv.kind', payload.type);
    Sentry.setContext('mbv', payload);
    return;
  }

  const level = LEVEL_BY_KIND[payload.type] || 'warning';
  const label = `[${payload.type}] ${payload.message}`;
  const extra = payload.detail ? `${label}: ${payload.detail}` : label;

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag('mbv.kind', payload.type);
    scope.setFingerprint(['mbv-recovery', payload.type]);
    scope.setContext('mbv', {
      kind: payload.type,
      detail: payload.detail || null,
      at: payload.at,
      href: location.href,
    });
    if (level === 'error') {
      Sentry.captureException(new Error(extra));
    } else {
      Sentry.captureMessage(extra, level);
    }
  });
}

function flushQueue() {
  const queued = window.__mbvErrorQueue || [];
  window.__mbvErrorQueue = [];
  queued.forEach((item) => reportRecovery(item));
}

export function initMonitoring() {
  window.__mbvReportError = reportRecovery;

  const dsn = resolveDsn();
  if (!dsn) {
    console.info(
      '[MBV:sentry] DSN mancante: incolla il DSN in src/config/sentry-dsn.ts oppure usa SENTRY_DSN=... al build. Vedi docs/sentry.md'
    );
    return;
  }

  const integrations = [
    Sentry.captureConsoleIntegration({ levels: ['error'] }),
    Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
  ];

  Sentry.init({
    dsn,
    environment: resolveEnvironment(),
    release: 'mbv-webar@0.1.0',
    sendDefaultPii: false,
    enableLogs: true,
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    ignoreErrors: [
      'Script error.',
      'Script error',
      'ResizeObserver loop',
      'Non-Error promise rejection captured',
    ],
    denyUrls: [/xr\.js/i, /8thwall/i],
    integrations,
    beforeSend(event) {
      const value = event.exception?.values?.[0]?.value || '';
      if (/Script error/i.test(value)) return null;
      return event;
    },
  });

  Sentry.setTag('app', 'mbv-webar');
  window.__mbvSentryReady = true;
  flushQueue();
}
