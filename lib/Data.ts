export const NAV_LINKS = [
  {
    name: "Home",
    hash: "/",
  },
  {
    name: "About",
    hash: "/About",
  },
  {
    name: "Past Interview",
    hash: "/PI",
  },
  {
    name: "FAQ",
    hash: "/FAQ",
  },
  {
    name: "Contact Us",
    hash: "/CU",
  },
] as const;

// data.ts
export const FAQS = [
  {
    question: "What is an AI mock interview?",
    answer:
      "An AI mock interview simulates a real job interview using artificial intelligence, helping candidates practice and receive instant feedback on their answers.",
  },
  {
    question: "How does the platform tailor interviews?",
    answer:
      "Our platform generates interview questions based on your selected job role, experience, and the provided job description for realistic practice.",
  },
  {
    question: "Can I practice both behavioral and technical questions?",
    answer:
      "Yes, you can practice behavioral, HR, and technical (industry-specific, coding) questions for comprehensive interview preparation.",
  },
  {
    question: "Is feedback instant?",
    answer:
      "Yes, you receive real-time feedback highlighting areas for improvement and suggestions to refine your answers.",
  },
  {
    question: "Can I review my interview history and progress?",
    answer:
      "Absolutely! You can access past interview attempts, review feedback, and track your improvement over time within your account dashboard.",
  },
];
