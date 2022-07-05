export type Question = {
  id: string;
  priority: number;
  questionText: MultiLanguageString;
  answerText: MultiLanguageString;
};

type MultiLanguageString = {
  ua: string;
  en: string;
};
