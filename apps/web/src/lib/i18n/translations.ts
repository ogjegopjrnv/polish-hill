export const translations = {
  uk: {
    nav: {
      documents: "Документи",
      lots: "Дуплекси",
      masterPlan: "Планування",
      location: "Локація",
      finance: "Фінанси",
      progress: "Хід робіт",
      about: "Про нас",
      contact: "Контакти",
    },
    cta: {
      bookTour: "Записатись на огляд",
      chooseCottage: "Обрати дуплекс",
      getPrice: "Отримати ціни",
      callUs: "Зателефонувати",
      learnMore: "Детальніше",
    },
    hero: {
      eyebrow: "Дуплекси • Старт продажів",
      heading: "Дуплекси з прибудинковою територією в Оболонському районі Києва",
      subtitle:
        "Безвідсоткове розтермінування до 18 місяців. Знижка 5% при 100% оплаті.",
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
  },
  en: {
    nav: {
      documents: "Documents",
      lots: "Duplexes",
      masterPlan: "Floor Plans",
      location: "Location",
      finance: "Finance",
      progress: "Progress",
      about: "About",
      contact: "Contact",
    },
    cta: {
      bookTour: "Book a Tour",
      chooseCottage: "Choose a Duplex",
      getPrice: "Get Prices",
      callUs: "Call Us",
      learnMore: "Learn More",
    },
    hero: {
      eyebrow: "Duplexes • Sales Open",
      heading:
        "Duplexes with private grounds in Obolon district, Kyiv",
      subtitle:
        "Interest-free installment for 18 months. 5% discount for full payment.",
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
  },
} as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale = "uk") {
  return translations[locale];
}
