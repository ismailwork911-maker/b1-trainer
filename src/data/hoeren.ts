import type { ModuleConfig, TeilConfig, ExamAnswerKey } from './types';

export const hoerenTeilConfigs: TeilConfig[] = [
  {
    teil: 1,
    title: 'Teil 1 — Hören',
    instructions:
      'Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Zu jedem Text lösen Sie zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung.',
    questionRange: [1, 10],
    questionType: 'richtig-falsch',
    options: ['Richtig', 'Falsch'],
  },
  {
    teil: 2,
    title: 'Teil 2 — Hören',
    instructions:
      'Sie hören einen Text. Sie hören den Text einmal. Dazu lösen Sie fünf Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.',
    questionRange: [11, 15],
    questionType: 'abc',
    options: ['a', 'b', 'c'],
  },
  {
    teil: 3,
    title: 'Teil 3 — Hören',
    instructions:
      'Sie hören ein Gespräch. Sie hören das Gespräch einmal. Dazu lösen Sie sieben Aufgaben. Wählen Sie: Sind die Aussagen Richtig oder Falsch?',
    questionRange: [16, 22],
    questionType: 'richtig-falsch',
    options: ['Richtig', 'Falsch'],
  },
  {
    teil: 4,
    title: 'Teil 4 — Hören',
    instructions:
      'Sie hören eine Diskussion. Sie hören die Diskussion zweimal. Dazu lösen Sie acht Aufgaben. Wählen Sie bei jeder Aufgabe: Ja oder Nein?',
    questionRange: [23, 30],
    questionType: 'ja-nein',
    options: ['Ja', 'Nein'],
  },
];

export const hoerenModule: ModuleConfig = {
  id: 'hoeren',
  name: 'Hören',
  icon: 'Headphones',
  totalQuestions: 30,
  teile: 4,
  timeMinutes: 40,
  passThreshold: 18,
  teilConfigs: hoerenTeilConfigs,
};

// ────────────────────────────────────────────
// Answer keys: question number → correct answer
// TODO: Fill these in from the book (PDF)
// ────────────────────────────────────────────

export const hoerenAnswerKeys: Record<number, ExamAnswerKey> = {
  1: {
    1: 'Richtig', 2: 'Falsch', 3: 'Falsch', 4: 'Richtig', 5: 'Richtig',
    6: 'Falsch', 7: 'Richtig', 8: 'Falsch', 9: 'Richtig', 10: 'Falsch',
    11: 'b', 12: 'a', 13: 'c', 14: 'b', 15: 'a',
    16: 'Richtig', 17: 'Falsch', 18: 'Richtig', 19: 'Falsch', 20: 'Richtig', 21: 'Falsch', 22: 'Richtig',
    23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein', 27: 'Ja', 28: 'Nein', 29: 'Ja', 30: 'Nein',
  },
  2: {
    1: 'Falsch', 2: 'Richtig', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig',
    6: 'Falsch', 7: 'Falsch', 8: 'Richtig', 9: 'Falsch', 10: 'Richtig',
    11: 'c', 12: 'b', 13: 'a', 14: 'c', 15: 'b',
    16: 'Falsch', 17: 'Richtig', 18: 'Falsch', 19: 'Richtig', 20: 'Falsch', 21: 'Richtig', 22: 'Falsch',
    23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja', 27: 'Nein', 28: 'Ja', 29: 'Nein', 30: 'Ja',
  },
  3: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Richtig', 5: 'Falsch',
    6: 'Richtig', 7: 'Falsch', 8: 'Richtig', 9: 'Falsch', 10: 'Richtig',
    11: 'a', 12: 'c', 13: 'b', 14: 'a', 15: 'c',
    16: 'Richtig', 17: 'Falsch', 18: 'Richtig', 19: 'Richtig', 20: 'Falsch', 21: 'Richtig', 22: 'Falsch',
    23: 'Ja', 24: 'Ja', 25: 'Nein', 26: 'Ja', 27: 'Nein', 28: 'Ja', 29: 'Nein', 30: 'Ja',
  },
  4: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Falsch',
    6: 'Richtig', 7: 'Richtig', 8: 'Falsch', 9: 'Richtig', 10: 'Falsch',
    11: 'b', 12: 'a', 13: 'c', 14: 'b', 15: 'a',
    16: 'Falsch', 17: 'Richtig', 18: 'Falsch', 19: 'Richtig', 20: 'Richtig', 21: 'Falsch', 22: 'Richtig',
    23: 'Nein', 24: 'Ja', 25: 'Ja', 26: 'Nein', 27: 'Ja', 28: 'Nein', 29: 'Ja', 30: 'Nein',
  },
  5: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig',
    6: 'Falsch', 7: 'Richtig', 8: 'Falsch', 9: 'Richtig', 10: 'Richtig',
    11: 'c', 12: 'b', 13: 'a', 14: 'c', 15: 'b',
    16: 'Richtig', 17: 'Richtig', 18: 'Falsch', 19: 'Richtig', 20: 'Falsch', 21: 'Richtig', 22: 'Falsch',
    23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Ja', 27: 'Nein', 28: 'Ja', 29: 'Nein', 30: 'Ja',
  },
  6: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Falsch',
    6: 'Richtig', 7: 'Falsch', 8: 'Richtig', 9: 'Falsch', 10: 'Richtig',
    11: 'a', 12: 'c', 13: 'b', 14: 'a', 15: 'c',
    16: 'Falsch', 17: 'Richtig', 18: 'Richtig', 19: 'Falsch', 20: 'Richtig', 21: 'Falsch', 22: 'Richtig',
    23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja', 27: 'Ja', 28: 'Nein', 29: 'Ja', 30: 'Nein',
  },
  7: {
    1: 'Richtig', 2: 'Richtig', 3: 'Falsch', 4: 'Richtig', 5: 'Falsch',
    6: 'Richtig', 7: 'Falsch', 8: 'Richtig', 9: 'Richtig', 10: 'Falsch',
    11: 'b', 12: 'a', 13: 'c', 14: 'b', 15: 'a',
    16: 'Richtig', 17: 'Falsch', 18: 'Richtig', 19: 'Falsch', 20: 'Richtig', 21: 'Richtig', 22: 'Falsch',
    23: 'Ja', 24: 'Nein', 25: 'Ja', 26: 'Nein', 27: 'Ja', 28: 'Ja', 29: 'Nein', 30: 'Ja',
  },
  8: {
    1: 'Falsch', 2: 'Richtig', 3: 'Richtig', 4: 'Falsch', 5: 'Richtig',
    6: 'Falsch', 7: 'Richtig', 8: 'Falsch', 9: 'Richtig', 10: 'Falsch',
    11: 'c', 12: 'b', 13: 'a', 14: 'c', 15: 'b',
    16: 'Falsch', 17: 'Richtig', 18: 'Falsch', 19: 'Richtig', 20: 'Falsch', 21: 'Richtig', 22: 'Richtig',
    23: 'Nein', 24: 'Ja', 25: 'Nein', 26: 'Ja', 27: 'Nein', 28: 'Ja', 29: 'Ja', 30: 'Nein',
  },
  9: {
    1: 'Richtig', 2: 'Falsch', 3: 'Richtig', 4: 'Richtig', 5: 'Falsch',
    6: 'Richtig', 7: 'Falsch', 8: 'Richtig', 9: 'Falsch', 10: 'Richtig',
    11: 'a', 12: 'c', 13: 'b', 14: 'a', 15: 'c',
    16: 'Richtig', 17: 'Falsch', 18: 'Richtig', 19: 'Richtig', 20: 'Falsch', 21: 'Richtig', 22: 'Falsch',
    23: 'Ja', 24: 'Ja', 25: 'Nein', 26: 'Ja', 27: 'Nein', 28: 'Ja', 29: 'Nein', 30: 'Ja',
  },
  10: {
    1: 'Falsch', 2: 'Richtig', 3: 'Falsch', 4: 'Falsch', 5: 'Richtig',
    6: 'Falsch', 7: 'Richtig', 8: 'Falsch', 9: 'Richtig', 10: 'Richtig',
    11: 'b', 12: 'a', 13: 'c', 14: 'b', 15: 'a',
    16: 'Falsch', 17: 'Richtig', 18: 'Falsch', 19: 'Richtig', 20: 'Richtig', 21: 'Falsch', 22: 'Richtig',
    23: 'Nein', 24: 'Ja', 25: 'Ja', 26: 'Nein', 27: 'Ja', 28: 'Nein', 29: 'Ja', 30: 'Nein',
  },
};
