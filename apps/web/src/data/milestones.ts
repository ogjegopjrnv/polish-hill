export type MilestoneStatus = "done" | "current" | "upcoming";

export interface Milestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  video?: string;
  poster?: string;
}

// Квартали орієнтовні — узгодити із забудовником перед публікацією змін
export const milestones: Milestone[] = [
  {
    id: "foundation",
    quarter: "Q3 2026",
    title: "Фундамент",
    description:
      "Підготовка основи, гідроізоляція та заливка монолітної стрічки бетононасосом.",
    status: "done",
    video: "/videos/progress/foundation.mp4?v=2",
    poster: "/videos/progress/foundation-poster.jpg?v=2",
  },
  {
    id: "walls",
    quarter: "Q4 2026",
    title: "Коробка: стіни та перекриття",
    description: "Зведення несучих стін і міжповерхових перекриттів усіх секцій.",
    status: "upcoming",
  },
  {
    id: "roof",
    quarter: "Q1 2027",
    title: "Дах, вікна та фасад",
    description: "Покрівельні роботи, встановлення вікон, утеплення та оздоблення фасаду.",
    status: "upcoming",
  },
  {
    id: "utilities",
    quarter: "Q2 2027",
    title: "Комунікації та внутрішні роботи",
    description: "Автономні комунікації кожної секції, стяжка, штукатурка, розводка.",
    status: "upcoming",
  },
  {
    id: "handover",
    quarter: "Q3 2027",
    title: "Благоустрій та здача",
    description: "Прибудинкова територія, паркомісця, огорожа. Передача ключів власникам.",
    status: "upcoming",
  },
];
