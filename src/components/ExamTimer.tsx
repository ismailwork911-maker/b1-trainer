import { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface ExamTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  paused: boolean;
  onTogglePause: () => void;
  frozen: boolean; // true after grading — stops timer completely
}

export default function ExamTimer({ totalSeconds, onTimeUp, paused, onTogglePause, frozen }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    if (paused || frozen || remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onTimeUpRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, frozen, remaining]);

  const reset = useCallback(() => setRemaining(totalSeconds), [totalSeconds]);

  // Expose reset via ref pattern
  const resetRef = useRef(reset);
  resetRef.current = reset;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / totalSeconds) * 100;
  const isWarning = remaining > 0 && remaining <= 300; // <5 min
  const isExpired = remaining <= 0;

  const colorClass = isExpired
    ? 'text-red-600'
    : isWarning
      ? 'text-amber-600'
      : 'text-stone-700';

  const barColor = isExpired
    ? 'bg-red-500'
    : isWarning
      ? 'bg-amber-500'
      : 'bg-emerald-500';

  return (
    <div className="exam-timer no-print">
      <div className="flex items-center justify-between px-4 py-2">
        <div className={`flex items-center gap-2 font-mono text-lg font-bold ${colorClass}`}>
          {isExpired ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
          <span>
            {isExpired
              ? 'Zeit abgelaufen!'
              : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
          </span>
        </div>
        {!frozen && !isExpired && (
          <button onClick={onTogglePause} className="nav-btn nav-btn-secondary text-xs">
            {paused ? 'Fortsetzen' : 'Pause'}
          </button>
        )}
      </div>
      <div className="h-1 bg-stone-200">
        <div
          className={`timer-bar h-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Expose reset imperatively
export function useTimerReset() {
  const ref = useRef<() => void>(() => {});
  return ref;
}
