import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Check,
  X,
  RotateCcw,
  ChevronUp,
} from 'lucide-react';
import type { ModuleConfig, ExamAnswerKey, ExamResult, TeilConfig } from '@/data/types';
import ExamTimer from './ExamTimer';
import AudioPlayer from './AudioPlayer';

interface Props {
  module: ModuleConfig;
  examId: number;
  answerKey: ExamAnswerKey;
  audioMap?: Record<number, string[]>; // teil → audio files (only for Hören)
  onBack: () => void;
  onComplete: (result: ExamResult) => void;
}

export default function ExamView({
  module: mod,
  examId,
  answerKey,
  audioMap,
  onBack,
  onComplete,
}: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Score calculation
  const score = isGraded
    ? Object.entries(answerKey).filter(([q, a]) => answers[Number(q)] === a).length
    : 0;
  const answeredCount = Object.keys(answers).length;
  const passed = score >= mod.passThreshold;

  // Scroll listener for scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelect = useCallback(
    (questionNum: number, value: string) => {
      if (isGraded) return;
      setAnswers((prev) => ({ ...prev, [questionNum]: value }));
    },
    [isGraded],
  );

  const handleGrade = () => {
    setIsGraded(true);
    setTimerPaused(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });

    const result: ExamResult = {
      module: mod.id,
      examId,
      date: new Date().toLocaleDateString('de-DE'),
      score: Object.entries(answerKey).filter(([q]) => answers[Number(q)] === answerKey[Number(q)]).length,
      total: mod.totalQuestions,
      passed:
        Object.entries(answerKey).filter(([q]) => answers[Number(q)] === answerKey[Number(q)]).length >=
        mod.passThreshold,
      answers: { ...answers },
    };
    onComplete(result);
  };

  const handleRetry = () => {
    setAnswers({});
    setIsGraded(false);
    setTimerPaused(false);
    setResetKey((k) => k + 1);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTimeUp = () => {
    // Auto-grade when time runs out
    handleGrade();
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Top nav bar */}
      <div className="nav-bar" ref={topRef}>
        <div className="max-w-a4 mx-auto flex items-center justify-between px-4 py-2">
          <button onClick={onBack} className="nav-btn nav-btn-secondary text-sm">
            <ChevronLeft className="w-4 h-4" /> Zurück
          </button>
          <h1 className="font-serif text-base font-bold">
            {mod.name} — Modelltest {examId}
          </h1>
          <div className="w-20" />
        </div>
        <ExamTimer
          key={resetKey}
          totalSeconds={mod.timeMinutes * 60}
          onTimeUp={handleTimeUp}
          paused={timerPaused}
          onTogglePause={() => setTimerPaused((p) => !p)}
          frozen={isGraded}
        />
      </div>

      {/* Content */}
      <div className={`max-w-a4 mx-auto px-4 pt-28 ${isGraded ? 'result-sheet' : ''}`}>
        {/* Pass/fail banner */}
        {isGraded && (
          <div className={`result-band mb-8 ${passed ? 'pass' : 'fail'}`}>
            {passed ? (
              <span>Bestanden! 🎉 — {score}/{mod.totalQuestions}</span>
            ) : (
              <span>Nicht bestanden — {score}/{mod.totalQuestions}</span>
            )}
            <p className="text-sm font-normal mt-1 opacity-75">
              Mindestpunktzahl: {mod.passThreshold}/{mod.totalQuestions} (
              {Math.round((mod.passThreshold / mod.totalQuestions) * 100)}%)
            </p>
          </div>
        )}

        {/* Teile */}
        {mod.teilConfigs.map((teil) => (
          <TeilSection
            key={`${resetKey}-teil-${teil.teil}`}
            teil={teil}
            answers={answers}
            answerKey={answerKey}
            isGraded={isGraded}
            onSelect={handleSelect}
            audioFiles={audioMap?.[teil.teil]}
            resetKey={resetKey}
          />
        ))}

        {/* Retry button after grading */}
        {isGraded && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={handleRetry} className="nav-btn nav-btn-primary">
              <RotateCcw className="w-4 h-4" /> Nochmal
            </button>
            <button onClick={onBack} className="nav-btn nav-btn-secondary">
              <ChevronLeft className="w-4 h-4" /> Zurück zur Übersicht
            </button>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      {!isGraded && (
        <div className="sticky-bottom fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-stone-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] no-print">
          <div className="max-w-a4 mx-auto flex items-center justify-between px-4 py-3">
            <span className="text-sm text-stone-500">
              <span className="font-bold text-stone-700">{answeredCount}</span> /{' '}
              {mod.totalQuestions} beantwortet
            </span>
            <button
              onClick={handleGrade}
              className="nav-btn nav-btn-primary"
            >
              Prüfung auswerten
            </button>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {isGraded && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-stone-800 text-white shadow-lg flex items-center justify-center hover:bg-stone-700 transition-colors no-print"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

/* ───────────────────────────── Teil Section ───────────────────────────── */

interface TeilSectionProps {
  teil: TeilConfig;
  answers: Record<number, string>;
  answerKey: ExamAnswerKey;
  isGraded: boolean;
  onSelect: (q: number, v: string) => void;
  audioFiles?: string[];
  resetKey: number;
}

function TeilSection({
  teil,
  answers,
  answerKey,
  isGraded,
  onSelect,
  audioFiles,
  resetKey,
}: TeilSectionProps) {
  const [start, end] = teil.questionRange;
  const questions = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <section className="mb-10">
      <h3 className="teil-header">{teil.title}</h3>
      <p className="teil-instructions">{teil.instructions}</p>

      {/* Audio player for Hören */}
      {audioFiles && audioFiles.length > 0 && (
        <AudioPlayer
          files={audioFiles}
          maxPlays={1}
          label={teil.title}
          resetKey={resetKey}
        />
      )}

      {/* Questions */}
      <div className="space-y-1">
        {questions.map((q) => {
          const userAnswer = answers[q];
          const correctAnswer = answerKey[q];
          const isCorrect = userAnswer === correctAnswer;
          const isUnanswered = !userAnswer;

          let rowClass = '';
          if (isGraded) {
            if (isUnanswered) rowClass = 'unanswered';
            else if (isCorrect) rowClass = 'correct';
            else rowClass = 'wrong';
          }

          return (
            <div key={q} className={`question-row ${rowClass}`}>
              {/* Question number */}
              <div className="question-number">
                {isGraded ? (
                  isCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : isUnanswered ? (
                    <span>—</span>
                  ) : (
                    <X className="w-4 h-4" />
                  )
                ) : (
                  q
                )}
              </div>

              {/* Graded: show question number as text */}
              {isGraded && (
                <span className="text-sm font-medium text-stone-500 w-6 text-center">{q}</span>
              )}

              {/* Answer options */}
              <div className="flex flex-wrap gap-2">
                {teil.options.map((opt) => {
                  const isSelected = userAnswer === opt;
                  const isCorrectOpt = correctAnswer === opt;

                  let btnClass = 'answer-radio';
                  if (!isGraded) {
                    if (isSelected) btnClass += ' selected';
                  } else {
                    // Graded state
                    if (isCorrectOpt) {
                      btnClass += ' correct-answer';
                    } else if (isSelected && !isCorrect) {
                      btnClass += ' user-wrong';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isGraded}
                      onClick={() => onSelect(q, opt)}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
