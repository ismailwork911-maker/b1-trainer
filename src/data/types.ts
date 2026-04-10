export type QuestionType = 'richtig-falsch' | 'abc' | 'matching' | 'ja-nein';

export interface TeilConfig {
  teil: number;
  title: string;
  instructions: string;
  questionRange: [number, number];
  questionType: QuestionType;
  options: string[];
}

export interface ModuleConfig {
  id: string;
  name: string;
  icon: string;
  totalQuestions: number;
  teile: number;
  timeMinutes: number;
  passThreshold: number;
  teilConfigs: TeilConfig[];
}

export type ExamAnswerKey = Record<number, string>;

export interface ExamResult {
  module: string;
  examId: number;
  date: string;
  score: number;
  total: number;
  passed: boolean;
  answers: Record<number, string>;
}

export interface CompletedExam {
  examId: number;
  score: number;
  total: number;
  date: string;
  passed: boolean;
}
