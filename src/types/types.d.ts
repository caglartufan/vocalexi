export interface Quiz {
  question: string;
  options: {
    value: string;
    isCorrect: boolean;
    explanation: { [key: string]: string };
  }[];
}

export interface Word {
  id: string;
  audioURL: string | null;
  word: string;
  language: string;
  ipa: string | null;
  romanization: string | null;
  meanings: string[];
  examples: { [key: string]: string[] };
  quizzes: Quiz[];
  createdAt: Date;
  updatedAt: Date;
}
