export type Question = {
  id: string;
  priority: number;
  questionText: MultiLanguageString;
  answerText: MultiLanguageString;
};

export type MultiLanguageString = {
  ua: string;
  en: string;
};
