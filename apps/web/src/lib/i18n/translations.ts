export const translations = {
  uk: {
    nav: {
      lots: "Таунхауси",
      masterPlan: "Генплан",
      location: "Локація",
      finance: "Фінанси",
      about: "Про нас",
      contact: "Контакти",
    },
    cta: {
      bookTour: "Записатись на огляд",
      chooseCottage: "Обрати таунхаус",
      getPrice: "Отримати ціни",
      callUs: "Зателефонувати",
      learnMore: "Детальніше",
    },
    hero: {
      eyebrow: "II черга \u2022 Старт продажів",
      heading: "Котеджне містечко серед лісу за 15 хвилин від центру Києва",
      subtitle:
        "Безпроцентна розстрочка 1.5 року. Особливі умови для військовослужбовців.",
    },
    footer: {
      navigation: "Навігація",
      contacts: "Контакти",
      legal: "Юридичне",
      social: "Соцмережі",
      disclaimer:
        "Інформація на сайті не є публічною офертою. Для отримання детальної інформації зверніться до відділу продажів.",
      privacy: "Політика конфіденційності",
      terms: "Умови використання",
      schedule: "Пн-Пт: 9:00–18:00, Сб: 10:00–16:00",
    },
    phase: "черга",
    phaseBadge: "II черга — старт продажів",
  },
  en: {
    nav: {
      lots: "Townhouses",
      masterPlan: "Master Plan",
      location: "Location",
      finance: "Finance",
      about: "About",
      contact: "Contact",
    },
    cta: {
      bookTour: "Book a Tour",
      chooseCottage: "Choose a Townhouse",
      getPrice: "Get Prices",
      callUs: "Call Us",
      learnMore: "Learn More",
    },
    hero: {
      eyebrow: "Phase II \u2022 Sales Open",
      heading:
        "A cottage community in the forest, 15 minutes from Kyiv city center",
      subtitle:
        "Interest-free installment for 1.5 years. Special terms for military personnel.",
    },
    footer: {
      navigation: "Navigation",
      contacts: "Contacts",
      legal: "Legal",
      social: "Social",
      disclaimer:
        "Information on this website is not a public offer. Contact our sales team for details.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      schedule: "Mon-Fri: 9:00–18:00, Sat: 10:00–16:00",
    },
    phase: "phase",
    phaseBadge: "Phase II — Sales Open",
  },
} as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale = "uk") {
  return translations[locale];
}
