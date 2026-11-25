import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/dom';

// Node 26 slows jsdom/userEvent tests enough that waitFor's default 1000ms
// polling window expires under parallel contention, flaking userEvent-heavy
// App.test.tsx tests (element-not-found). Raise it to 5s — the companion to
// vite.config.ts's testTimeout bump — so the /ft-release viz gate stays
// reliable.
configure({ asyncUtilTimeout: 5000 });

// Node 26 defines globalThis.localStorage as an experimental getter that emits
// a warning when read without --localstorage-file. Install explicit test
// storage without touching that getter.
const makeStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    key(index: number): string | null {
      return [...store.keys()][index] ?? null;
    },
    getItem(key: string): string | null {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      store.set(key, String(value));
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    clear(): void {
      store.clear();
    },
  };
};
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: makeStorage(),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: makeStorage(),
    writable: true,
    configurable: true,
  });

  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function () {};
  }

  window.scrollTo = (() => {}) as typeof window.scrollTo;

  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  }
}

// Real listener map + emit helper so tests can drive useProjectData's SSE
// branches (change-refresh, drop→reconnect reconcile). `instances` lets a test
// reach the EventSource a hook created; tests clear it in their own setup.
class MockEventSource {
  static instances: MockEventSource[] = [];
  // `useProjectData` reads `EventSource.CLOSED` to tell a fatal handshake
  // reject (503 — the browser will not retry) from a mid-stream drop (it
  // will). Tests drive that by setting `readyState` before emitting 'error'.
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSED = 2;
  url: string;
  readyState = 0;
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  private listeners = new Map<string, Set<(ev: Event) => void>>();
  constructor(url: string) {
    this.url = url;
    MockEventSource.instances.push(this);
  }
  addEventListener(type: string, cb: (ev: Event) => void): void {
    let set = this.listeners.get(type);
    if (!set) {
      set = new Set();
      this.listeners.set(type, set);
    }
    set.add(cb);
  }
  removeEventListener(type: string, cb: (ev: Event) => void): void {
    this.listeners.get(type)?.delete(cb);
  }
  emit(type: string, data?: string): void {
    const ev =
      data === undefined ? new Event(type) : new MessageEvent(type, { data });
    for (const cb of this.listeners.get(type) ?? []) cb(ev);
  }
  close(): void {
    this.readyState = MockEventSource.CLOSED;
  }
}

if (typeof globalThis.EventSource === 'undefined') {
  (globalThis as unknown as { EventSource: typeof MockEventSource }).EventSource =
    MockEventSource;
}

// jsdom 25 ships HTMLDialogElement but not showModal/close behavior.
// Minimal polyfill: toggle the `open` attribute and fire the `close` event.
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & {
    showModal: () => void;
    show: () => void;
    close: (returnValue?: string) => void;
  };
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function () {
      this.setAttribute('open', '');
    };
  }
  if (typeof proto.show !== 'function') {
    proto.show = function () {
      this.setAttribute('open', '');
    };
  }
  if (typeof proto.close !== 'function') {
    proto.close = function (returnValue?: string) {
      this.removeAttribute('open');
      if (returnValue !== undefined) this.setAttribute('returnvalue', returnValue);
      this.dispatchEvent(new Event('close'));
    };
  }
}
