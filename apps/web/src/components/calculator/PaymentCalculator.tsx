import { useState, useEffect, useRef } from "react";

interface Props {
  locale?: "uk" | "en";
}

const t = {
  uk: {
    title: "Калькулятор платежів",
    homes: "Кількість будинків",
    downPayment: "Перший внесок, %",
    term: "Термін розстрочки, міс.",
    totalPrice: "Загальна вартість",
    downPaymentAmount: "Перший внесок",
    remaining: "Залишок",
    monthly: "Щомісячний платіж",
    note: "Розрахунок орієнтовний. Точні умови — у договорі.",
    cta: "Отримати пропозицію",
  },
  en: {
    title: "Payment calculator",
    homes: "Homes",
    downPayment: "Down payment, %",
    term: "Term, months",
    totalPrice: "Total price",
    downPaymentAmount: "Down payment",
    remaining: "Remaining",
    monthly: "Monthly payment",
    note: "Estimate only. Exact terms in the contract.",
    cta: "Get an offer",
  },
};

const HOUSE_AREA = 170;
const PRICE_PER_SQM = 1000;

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PaymentCalculator({ locale = "uk" }: Props) {
  const i = t[locale];

  const [homes, setHomes] = useState(1);
  const [downPct, setDownPct] = useState(30);
  const [termMonths, setTermMonths] = useState(18);

  const total = homes * HOUSE_AREA * PRICE_PER_SQM;
  const downAmount = Math.round(total * (downPct / 100));
  const remaining = total - downAmount;
  const monthly = termMonths > 0 ? Math.round(remaining / termMonths) : 0;

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const interacted = useRef(false);
  useEffect(() => {
    if (!interacted.current) { interacted.current = true; return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      import("@lib/analytics/analytics").then(({ trackCalculatorInteraction }) => {
        trackCalculatorInteraction({ homes, downPayment: downPct, term: termMonths, total, monthly });
      });
    }, 1500);
    return () => clearTimeout(debounceRef.current);
  }, [homes, downPct, termMonths]);

  return (
    <div className="rounded-[var(--ph-radius-2xl)] border border-[var(--ph-border)] bg-[var(--ph-surface)] p-6 shadow-[var(--ph-shadow-md)] sm:p-8 md:p-10">
      <h3
        className="text-xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {i.title}
      </h3>

      {/* Sliders */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SliderField
          label={i.homes}
          value={homes}
          min={1}
          max={5}
          step={1}
          unit={locale === "uk" ? "шт." : "pcs."}
          onChange={setHomes}
        />
        <SliderField
          label={i.downPayment}
          value={downPct}
          min={30}
          max={100}
          step={5}
          unit="%"
          onChange={setDownPct}
        />
        <SliderField
          label={i.term}
          value={termMonths}
          min={6}
          max={18}
          step={1}
          unit={locale === "uk" ? "міс." : "mo."}
          onChange={setTermMonths}
        />
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <ResultCard label={i.totalPrice} value={formatUSD(total)} />
        <ResultCard label={i.downPaymentAmount} value={formatUSD(downAmount)} />
        <ResultCard label={i.remaining} value={formatUSD(remaining)} />
        <ResultCard
          label={i.monthly}
          value={formatUSD(monthly)}
          highlight
        />
      </div>

      <p
        className="mt-6 text-center text-xs leading-relaxed"
        style={{ color: "var(--ph-ink-muted)" }}
      >
        {i.note}
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            import("@lib/analytics/analytics").then(({ trackCTAClick }) => {
              trackCTAClick("get_offer", "calculator");
            });
            const overlay = document.getElementById("modal-overlay");
            const card = document.getElementById("modal-card");
            if (overlay) {
              overlay.classList.remove("hidden");
              requestAnimationFrame(() => {
                overlay.style.opacity = "1";
                if (card) {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0) scale(1)";
                }
              });
              document.body.style.overflow = "hidden";
            }
          }}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[var(--ph-radius-lg)] px-8 text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98]"
          style={{
            background: "var(--ph-forest)",
            boxShadow: "0 4px 12px rgba(45,74,58,0.25)",
          }}
        >
          {i.cta}
        </button>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--ph-ink-soft)" }}
        >
          {label}
        </span>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ph-ink)" }}
        >
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider w-full"
        style={
          {
            "--pct": `${pct}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-[var(--ph-radius-lg)] p-4 text-center"
      style={{
        background: highlight ? "var(--ph-forest)" : "var(--ph-bg)",
        border: highlight ? "none" : "1px solid var(--ph-border)",
      }}
    >
      <p
        className="text-[0.6875rem] font-medium uppercase tracking-wider"
        style={{ color: highlight ? "rgba(255,255,255,0.7)" : "var(--ph-ink-muted)" }}
      >
        {label}
      </p>
      <p
        className="mt-1 text-lg font-bold tabular-nums tracking-tight"
        style={{
          fontFamily: "var(--font-mono)",
          color: highlight ? "#fff" : "var(--ph-ink)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
