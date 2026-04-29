declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// --------------- Helpers ---------------

function ga(event: string, params?: Record<string, unknown>): void {
  window.gtag?.("event", event, params);
}

function fb(event: string, params?: Record<string, unknown>): void {
  window.fbq?.("track", event, params);
}

function fbCustom(event: string, params?: Record<string, unknown>): void {
  window.fbq?.("trackCustom", event, params);
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
  fbCustom("CalculatorInteraction", { value: params.total, currency: "USD" });
}

export function trackCTAClick(ctaName: string, ctaLocation: string): void {
  ga("cta_click", { cta_name: ctaName, cta_location: ctaLocation });
  fbCustom("CTAClick", { cta_name: ctaName, cta_location: ctaLocation });
}

export function trackSectionView(sectionId: string): void {
  ga("section_view", { section: sectionId });
}

export function trackScheduleVisit(): void {
  ga("schedule_visit");
  fb("Schedule");
}

// --------------- Auto-tracking (called once from BaseLayout) ---------------

export function setupAutoTracking(): void {
  // Scroll depth (25%, 50%, 75%, 90%)
  const firedScroll = new Set<number>();
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.round((window.scrollY / max) * 100);
    for (const t of [25, 50, 75, 90]) {
      if (pct >= t && !firedScroll.has(t)) {
        firedScroll.add(t);
        ga("scroll", { percent_scrolled: t });
      }
    }
  }, { passive: true });

  // Outbound clicks
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
    if (!a?.href || a.href.startsWith("tel:") || a.href.startsWith("mailto:")) return;
    try {
      const u = new URL(a.href);
      if (u.hostname !== location.hostname) {
        ga("click", { link_url: a.href, link_domain: u.hostname, outbound: true });
      }
    } catch { /* skip */ }
  });

  // Time on page (30s, 60s, 120s, 300s)
  const firedTime = new Set<number>();
  let seconds = 0;
  let visible = true;
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; });
  setInterval(() => {
    if (!visible) return;
    seconds++;
    for (const m of [30, 60, 120, 300]) {
      if (seconds >= m && !firedTime.has(m)) {
        firedTime.add(m);
        ga("user_engagement", { engagement_time_msec: m * 1000 });
      }
    }
  }, 1000);

  // Form start — first focus on any form field
  document.querySelectorAll("form").forEach((form) => {
    let started = false;
    form.addEventListener("focusin", () => {
      if (started) return;
      started = true;
      ga("form_start", { form_id: form.id || "unknown" });
      fbCustom("FormStart", { form_id: form.id || "unknown" });
    });
  });

  // Phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => trackContact("phone"));
  });

  // CTA clicks (all [data-modal-trigger] buttons)
  document.querySelectorAll("[data-modal-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.closest("section")?.id || btn.closest("header")?.id || "unknown";
      trackCTAClick("book_tour", section);
      trackScheduleVisit();
    });
  });

  // Section visibility
  const trackedSections = new Set<string>();
  const sections = document.querySelectorAll("section[id]");
  if (sections.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!trackedSections.has(id)) {
            trackedSections.add(id);
            trackSectionView(id);
          }
        }
      });
    }, { threshold: 0.3 });
    sections.forEach((s) => obs.observe(s));
  }
}
