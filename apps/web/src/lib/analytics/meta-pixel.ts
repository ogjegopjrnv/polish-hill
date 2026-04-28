declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function initMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || window.fbq) return;

  const n = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  } as unknown as Window["fbq"] & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push: (...args: unknown[]) => void;
    loaded: boolean;
    version: string;
  };

  n.push = n as unknown as (...args: unknown[]) => void;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export function trackLead(): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}

export function trackViewContent(params?: Record<string, string>): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", params);
  }
}

export function trackContact(): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
}
