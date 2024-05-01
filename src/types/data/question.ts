export interface Question {
  id: number;
  number: number;
  question: string;
  options: string[];
  type: "text" | "radio" | "range";
  min_text?: string;
  max_text?: string;
}

export type QuestionnareStatus = "NOTREADY" | "READY" | "COMPLETED";
