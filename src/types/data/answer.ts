export interface AnswerResult {
  fullname: string;
  question: string;
  category: string;
  answer: string;
}

export interface AnswerResultDetail {
  result: AnswerResult[];
}
