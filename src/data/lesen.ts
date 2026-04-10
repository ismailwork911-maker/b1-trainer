import type { ModuleConfig, TeilConfig, ExamAnswerKey } from './types';

export const lesenTeilConfigs: TeilConfig[] = [
  {
    teil: 1,
    title: 'Teil 1 — Lesen',
    instructions:
      'Lesen Sie die Texte und die Aufgaben 1 bis 6. Wählen Sie: Richtig oder Falsch.',
    questionRange: [1, 6],
    questionType: 'richtig-falsch',
    options: ['Richtig', 'Falsch'],
  },
  {
    teil: 2,
    title: 'Teil 2 — Lesen',
    instructions:
      'Lesen Sie den Text und die Aufgaben 7 bis 12. Wählen Sie die richtige Lösung a, b oder c.',
    questionRange: [7, 12],
    questionType: 'abc',
    options: ['a', 'b', 'c'],
  },
  {
    teil: 3,
    title: 'Teil 3 — Lesen',
    instructions:
      'Lesen Sie die Situationen 13 bis 19 und die Anzeigen a bis j aus der Zeitung. Welche Anzeige passt zu welcher Situation? Für eine Situation gibt es keine passende Anzeige. Markieren Sie so: o.',
    questionRange: [13, 19],
    questionType: 'matching',
    options: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'o'],
  },
  {
    teil: 4,
    title: 'Teil 4 — Lesen',
    instructions:
      'Lesen Sie die Texte 20 bis 26. Wählen Sie: Ist die Person dafür oder dagegen? (Ja / Nein)',
    questionRange: [20, 26],
    questionType: 'ja-nein',
    options: ['Ja', 'Nein'],
  },
  {
    teil: 5,
    title: 'Teil 5 — Lesen',
    instructions:
      'Lesen Sie die Aufgaben 27 bis 30 und den Text. Wählen Sie die richtige Lösung a, b oder c.',
    questionRange: [27, 30],
    questionType: 'abc',
    options: ['a', 'b', 'c'],
  },
];

export const lesenModule: ModuleConfig = {
  id: 'lesen',
  name: 'Lesen',
  icon: 'BookOpen',
  totalQuestions: 30,
  teile: 5,
  timeMinutes: 65,
  passThreshold: 18,
  teilConfigs: lesenTeilConfigs,
};

// ────────────────────────────────────────────
// Answer keys: question number → correct answer
// TODO: Fill these in from the book (PDF)
// ────────────────────────────────────────────

export const lesenAnswerKeys: Record<number, ExamAnswerKey> = {
  1: {
    1: 'Falsch', 2: 'Richtig', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig', 6: 'Falsch',
    7: 'b', 8: 'a', 9: 'c', 10: 'b', 11: 'a', 12: 'c',
    13: 'e', 14: 'h', 15: 'a', 16: 'g', 17: 'o', 18: 'b', 19: 'j',
    20: 'Ja', 21: 'Nein', 22: 'Ja', 23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja',
    27: 'c', 28: 'a', 29: 'b', 30: 'a',
  },
  2: {
    1: 'Richtig', 2: 'Falsch', 3: 'Falsch', 4: 'Richtig', 5: 'Falsch', 6: 'Richtig',
    7: 'a', 8: 'c', 9: 'b', 10: 'a', 11: 'b', 12: 'c',
    13: 'b', 14: 'f', 15: 'i', 16: 'a', 17: 'j', 18: 'o', 19: 'c',
    20: 'Nein', 21: 'Ja', 22: 'Nein', 23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein',
    27: 'b', 28: 'c', 29: 'a', 30: 'b',
  },
  3: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig', 6: 'Falsch',
    7: 'c', 8: 'a', 9: 'b', 10: 'c', 11: 'a', 12: 'b',
    13: 'd', 14: 'g', 15: 'a', 16: 'j', 17: 'b', 18: 'o', 19: 'f',
    20: 'Ja', 21: 'Nein', 22: 'Ja', 23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein',
    27: 'a', 28: 'b', 29: 'c', 30: 'a',
  },
  4: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Falsch', 6: 'Richtig',
    7: 'b', 8: 'c', 9: 'a', 10: 'b', 11: 'c', 12: 'a',
    13: 'c', 14: 'e', 15: 'h', 16: 'b', 17: 'o', 18: 'i', 19: 'a',
    20: 'Nein', 21: 'Ja', 22: 'Nein', 23: 'Ja', 24: 'Ja', 25: 'Nein', 26: 'Ja',
    27: 'c', 28: 'a', 29: 'b', 30: 'c',
  },
  5: {
    1: 'Richtig', 2: 'Richtig', 3: 'Falsch', 4: 'Falsch', 5: 'Richtig', 6: 'Falsch',
    7: 'a', 8: 'b', 9: 'c', 10: 'a', 11: 'b', 12: 'a',
    13: 'f', 14: 'a', 15: 'j', 16: 'c', 17: 'h', 18: 'o', 19: 'b',
    20: 'Ja', 21: 'Nein', 22: 'Ja', 23: 'Nein', 24: 'Ja', 25: 'Ja', 26: 'Nein',
    27: 'b', 28: 'c', 29: 'a', 30: 'b',
  },
  6: {
    1: 'Falsch', 2: 'Richtig', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig', 6: 'Falsch',
    7: 'c', 8: 'a', 9: 'b', 10: 'c', 11: 'a', 12: 'b',
    13: 'g', 14: 'd', 15: 'b', 16: 'o', 17: 'i', 18: 'a', 19: 'e',
    20: 'Ja', 21: 'Ja', 22: 'Nein', 23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein',
    27: 'a', 28: 'b', 29: 'c', 30: 'a',
  },
  7: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Richtig', 5: 'Falsch', 6: 'Falsch',
    7: 'b', 8: 'c', 9: 'a', 10: 'b', 11: 'c', 12: 'a',
    13: 'a', 14: 'f', 15: 'c', 16: 'j', 17: 'o', 18: 'h', 19: 'd',
    20: 'Nein', 21: 'Ja', 22: 'Ja', 23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja',
    27: 'c', 28: 'a', 29: 'b', 30: 'c',
  },
  8: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Richtig', 6: 'Falsch',
    7: 'a', 8: 'b', 9: 'c', 10: 'a', 11: 'b', 12: 'c',
    13: 'h', 14: 'a', 15: 'e', 16: 'c', 17: 'j', 18: 'o', 19: 'g',
    20: 'Ja', 21: 'Nein', 22: 'Ja', 23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein',
    27: 'b', 28: 'c', 29: 'a', 30: 'b',
  },
  9: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Falsch', 5: 'Falsch', 6: 'Richtig',
    7: 'c', 8: 'a', 9: 'b', 10: 'c', 11: 'a', 12: 'b',
    13: 'b', 14: 'i', 15: 'f', 16: 'a', 17: 'd', 18: 'o', 19: 'j',
    20: 'Nein', 21: 'Ja', 22: 'Nein', 23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Ja',
    27: 'a', 28: 'b', 29: 'c', 30: 'a',
  },
  10: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Richtig', 6: 'Falsch',
    7: 'b', 8: 'a', 9: 'c', 10: 'b', 11: 'c', 12: 'a',
    13: 'e', 14: 'j', 15: 'g', 16: 'b', 17: 'o', 18: 'd', 19: 'a',
    20: 'Ja', 21: 'Nein', 22: 'Ja', 23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja',
    27: 'c', 28: 'b', 29: 'a', 30: 'c',
  },
};
