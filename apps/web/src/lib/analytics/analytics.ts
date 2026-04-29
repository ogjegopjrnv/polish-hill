declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// --------------- Init ---------------

export function initGtag(measurementId: string): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true,
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  setupStandardTracking();
}

export function initMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || window.fbq) return;

  const n = function (...args: unknown[]) {
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

// --------------- Standard Auto-Tracking ---------------

function setupStandardTracking(): void {
  // Scroll depth tracking (25%, 50%, 75%, 90%)
  const scrollThresholds = [25, 50, 75, 90];
  const firedThresholds = new Set<number>();

  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const pct = Math.round((window.scrollY / scrollHeight) * 100);

    for (const threshold of scrollThresholds) {
      if (pct >= threshold && !firedThresholds.has(threshold)) {
        firedThresholds.add(threshold);
        ga("scroll", { percent_scrolled: threshold });
        if (threshold === 90) fb("ViewContent", { content_name: "page_scroll_90" });
      }
    }
  }, { passive: true });

  // Outbound link click tracking
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.href;
    if (!href || href.startsWith("tel:") || href.startsWith("mailto:")) return;

    try {
      const url = new URL(href);
      if (url.hostname !== window.location.hostname) {
        ga("click", { link_url: href, link_domain: url.hostname, outbound: true });
      }
    } catch { /* ignore invalid URLs */ }
  });

  // User engagement: track time on page at intervals
  const engagementMarks = [30, 60, 120, 300];
  const firedEngagement = new Set<number>();
  let engagementSeconds = 0;
  let isVisible = true;

  document.addEventListener("visibilitychange", () => {
    isVisible = document.visibilityState === "visible";
  });

  setInterval(() => {
    if (!isVisible) return;
    engagementSeconds++;
    for (const mark of engagementMarks) {
      if (engagementSeconds >= mark && !firedEngagement.has(mark)) {
        firedEngagement.add(mark);
        ga("user_engagement", { engagement_time_msec: mark * 1000 });
      }
    }
  }, 1000);

  // Form start tracking — detect first interaction with any form input
  document.querySelectorAll("form").forEach((form) => {
    let started = false;
    form.addEventListener("focusin", () => {
      if (started) return;
      started = true;
      ga("form_start", { form_id: form.id || "unknown" });
      fbCustom("FormStart", { form_id: form.id || "unknown" });
    }, { once: false });
  });
}

// --------------- Helpers ---------------

function ga(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

function fb(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

function fbCustom(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, params);
  }
}

// --------------- Standard Events ---------------

export function trackLead(source?: string): void {
  ga("generate_lead", { currency: "USD", event_label: source });
  fb("Lead", { content_name: source });
}

export function trackContact(method: string): void {
  ga("contact", { method });
  fb("Contact");
}

export function trackViewContent(lot: { id: string; number: number; price: number; area: number }): void {
  ga("view_item", {
    currency: "USD",
    value: lot.price,
    items: [{ item_id: lot.id, item_name: `Таунхаус №${lot.number}`, price: lot.price }],
  });
  fb("ViewContent", {
    content_type: "product",
    content_ids: [lot.id],
    content_name: `Таунхаус №${lot.number}`,
    currency: "USD",
    value: lot.price,
  });
}

// --------------- Custom Events ---------------

export function trackSelectItem(lot: { id: string; number: number; price: number }): void {
  ga("select_item", {
    items: [{ item_id: lot.id, item_name: `Таунхаус №${lot.number}`, price: lot.price }],
  });
  fbCustom("SelectItem", {
    content_ids: [lot.id],
    content_name: `Таунхаус №${lot.number}`,
  });
}

export function trackCalculatorInteraction(params: {
  homes: number;
  downPayment: number;
  term: number;
  total: number;
  monthly: number;
}): void {
  ga("calculator_interaction", {
    homes: params.homes,
    down_payment_pct: params.downPayment,
    term_months: params.term,
    total_value: params.total,
    monthly_payment: params.monthly,
  });
  fbCustom("CalculatorInteraction", {
    value: params.total,
    currency: "USD",
  });
}

export function trackCTAClick(ctaName: string, location: string): void {
  ga("cta_click", { cta_name: ctaName, location });
  fbCustom("CTAClick", { cta_name: ctaName, location });
}

export function trackSectionView(sectionId: string): void {
  ga("section_view", { section: sectionId });
}

export function trackScheduleVisit(): void {
  ga("schedule_visit");
  fb("Schedule");
}
