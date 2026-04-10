import { ChevronLeft, Check, RotateCcw } from 'lucide-react';
import type { ModuleConfig, CompletedExam, ExamResult } from '@/data/types';

interface Props {
  module: ModuleConfig;
  completedExams: Record<number, CompletedExam>;
  history: ExamResult[];
  onSelectExam: (examId: number) => void;
  onBack: () => void;
  onReset: () => void;
}

const EXAM_COUNT = 10;

export default function ExamSelector({
  module: mod,
  completedExams,
  history,
  onSelectExam,
  onBack,
  onReset,
}: Props) {
  const hasAnyCompleted = Object.keys(completedExams).length > 0;
  const moduleHistory = history.filter((r) => r.module === mod.id);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <div className="nav-bar">
        <div className="max-w-a4 mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="nav-btn nav-btn-secondary">
            <ChevronLeft className="w-4 h-4" /> Zurück
          </button>
          <h1 className="font-serif text-lg font-bold">{mod.name}</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-a4 mx-auto px-4 pt-20 pb-12">
        {/* Exam grid */}
        <h2 className="font-serif text-xl font-bold text-stone-800 mb-4">
          Modelltest wählen
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {Array.from({ length: EXAM_COUNT }, (_, i) => i + 1).map((id) => {
            const completed = completedExams[id];
            const isCompleted = !!completed;

            return (
              <button
                key={id}
                disabled={isCompleted}
                onClick={() => onSelectExam(id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-6 rounded-xl border-2 transition-all ${
                  isCompleted
                    ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-md cursor-pointer'
                }`}
              >
                <span className={`text-2xl font-bold ${isCompleted ? 'line-through' : ''}`}>
                  {id}
                </span>
                {isCompleted && (
                  <>
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs text-stone-500">
                      {completed.score}/{completed.total}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Reset button */}
        {hasAnyCompleted && (
          <button
            onClick={onReset}
            className="nav-btn nav-btn-secondary text-sm mb-8"
          >
            <RotateCcw className="w-4 h-4" /> Fortschritt zurücksetzen
          </button>
        )}

        {/* History table */}
        {moduleHistory.length > 0 && (
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-800 mb-3">
              Bisherige Ergebnisse
            </h2>
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-stone-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Datum</th>
                    <th className="px-4 py-2 text-left">Test</th>
                    <th className="px-4 py-2 text-left">Ergebnis</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...moduleHistory].reverse().map((r, i) => (
                    <tr key={i} className="border-t border-stone-100">
                      <td className="px-4 py-2 text-stone-500">{r.date}</td>
                      <td className="px-4 py-2 font-medium">Modelltest {r.examId}</td>
                      <td className="px-4 py-2 font-bold">
                        {r.score}/{r.total}
                      </td>
                      <td className="px-4 py-2">
                        {r.passed ? (
                          <span className="text-emerald-600 font-semibold">Bestanden ✓</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Nicht bestanden</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
