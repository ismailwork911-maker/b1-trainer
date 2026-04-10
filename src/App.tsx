import { useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CompletedExam, ExamResult } from '@/data/types';
import { lesenModule, lesenAnswerKeys } from '@/data/lesen';
import { hoerenModule, hoerenAnswerKeys } from '@/data/hoeren';
import { getAudioMap } from '@/data/audioMap';
import LandingPage from '@/components/LandingPage';
import ExamSelector from '@/components/ExamSelector';
import ExamView from '@/components/ExamView';

const modules = [lesenModule, hoerenModule];

export default function App() {
  const [view, setView] = useState<'home' | 'lesen' | 'hoeren'>('home');
  const [examId, setExamId] = useState<number | null>(null);

  // Persisted state
  const [completedLesen, setCompletedLesen] = useLocalStorage<Record<number, CompletedExam>>(
    'completed_lesen',
    {},
  );
  const [completedHoeren, setCompletedHoeren] = useLocalStorage<Record<number, CompletedExam>>(
    'completed_hoeren',
    {},
  );
  const [historyLesen, setHistoryLesen] = useLocalStorage<ExamResult[]>('history_lesen', []);
  const [historyHoeren, setHistoryHoeren] = useLocalStorage<ExamResult[]>('history_hoeren', []);

  const completed = view === 'lesen' ? completedLesen : completedHoeren;
  const setCompleted = view === 'lesen' ? setCompletedLesen : setCompletedHoeren;
  const history = view === 'lesen' ? historyLesen : historyHoeren;
  const setHistory = view === 'lesen' ? setHistoryLesen : setHistoryHoeren;
  const answerKeys = view === 'lesen' ? lesenAnswerKeys : hoerenAnswerKeys;
  const currentModule = view === 'lesen' ? lesenModule : hoerenModule;

  const handleExamComplete = useCallback(
    (result: ExamResult) => {
      // Save to history (all attempts)
      setHistory((prev) => [...prev, result]);
      // Mark as completed (latest result)
      setCompleted((prev) => ({
        ...prev,
        [result.examId]: {
          examId: result.examId,
          score: result.score,
          total: result.total,
          date: result.date,
          passed: result.passed,
        },
      }));
    },
    [setHistory, setCompleted],
  );

  const handleReset = useCallback(() => {
    setCompleted({});
    // History is NOT cleared — keeps progress tracking
  }, [setCompleted]);

  // ─── Routing ───
  if (view === 'home') {
    return (
      <LandingPage
        modules={modules}
        onSelect={(id) => setView(id as 'lesen' | 'hoeren')}
      />
    );
  }

  if (examId === null) {
    return (
      <ExamSelector
        module={currentModule}
        completedExams={completed}
        history={[...historyLesen, ...historyHoeren]}
        onSelectExam={setExamId}
        onBack={() => setView('home')}
        onReset={handleReset}
      />
    );
  }

  return (
    <ExamView
      module={currentModule}
      examId={examId}
      answerKey={answerKeys[examId] ?? {}}
      audioMap={view === 'hoeren' ? getAudioMap(examId) : undefined}
      onBack={() => setExamId(null)}
      onComplete={handleExamComplete}
    />
  );
}
