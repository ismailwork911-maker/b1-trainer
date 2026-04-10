import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  /** One or more audio files to play sequentially */
  files: string[];
  /** Max number of times the sequence can be played */
  maxPlays?: number;
  /** Label shown next to the player */
  label: string;
  /** Called when playback completes */
  onComplete?: () => void;
  /** Externally reset plays used (e.g. "Nochmal") */
  resetKey?: number;
}

export default function AudioPlayer({
  files,
  maxPlays = 1,
  label,
  onComplete,
  resetKey,
}: AudioPlayerProps) {
  const [playsUsed, setPlaysUsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentFileIdx, setCurrentFileIdx] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const durationsRef = useRef<number[]>([]);
  const offsetRef = useRef(0);

  // Reset on resetKey change
  useEffect(() => {
    setPlaysUsed(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentFileIdx(0);
    offsetRef.current = 0;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [resetKey]);

  // Preload durations
  useEffect(() => {
    let cancelled = false;
    const loadDurations = async () => {
      const durs: number[] = [];
      for (const file of files) {
        const dur = await new Promise<number>((resolve) => {
          const a = new Audio();
          a.preload = 'metadata';
          a.addEventListener('loadedmetadata', () => resolve(a.duration));
          a.addEventListener('error', () => resolve(0));
          a.src = file;
        });
        if (cancelled) return;
        durs.push(dur);
      }
      durationsRef.current = durs;
      setTotalDuration(durs.reduce((s, d) => s + d, 0));
    };
    loadDurations();
    return () => { cancelled = true; };
  }, [files]);

  const playFile = useCallback(
    (idx: number) => {
      if (idx >= files.length) {
        // Sequence complete
        setIsPlaying(false);
        setPlaysUsed((p) => p + 1);
        onComplete?.();
        return;
      }
      setCurrentFileIdx(idx);
      const audio = new Audio(files[idx]);
      audioRef.current = audio;

      // Calculate offset = sum of durations of files before this one
      offsetRef.current = durationsRef.current.slice(0, idx).reduce((s, d) => s + d, 0);

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(offsetRef.current + audio.currentTime);
      });
      audio.addEventListener('ended', () => {
        playFile(idx + 1);
      });
      audio.addEventListener('error', () => {
        // Skip broken file
        playFile(idx + 1);
      });
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    },
    [files, onComplete],
  );

  const handlePlay = () => {
    if (playsUsed >= maxPlays || isPlaying) return;
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentFileIdx(0);
    offsetRef.current = 0;
    playFile(0);
  };

  const disabled = playsUsed >= maxPlays;
  const pct = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-lg border p-3 mb-4 ${disabled ? 'bg-stone-100 border-stone-200' : 'bg-white border-stone-300'}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={disabled || isPlaying}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            disabled
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : isPlaying
                ? 'bg-emerald-500 text-white animate-pulse'
                : 'bg-stone-800 text-white hover:bg-stone-700 cursor-pointer'
          }`}
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="truncate font-medium">{label}</span>
            <span className="flex items-center gap-2">
              <span>{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
              <span className={`font-bold ${disabled ? 'text-red-500' : 'text-stone-600'}`}>
                {playsUsed}/{maxPlays}×
              </span>
            </span>
          </div>
          {/* Progress bar – display only, not interactive */}
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${disabled ? 'bg-stone-400' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
