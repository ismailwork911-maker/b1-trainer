import { BookOpen, Headphones } from 'lucide-react';
import type { ModuleConfig } from '@/data/types';

interface Props {
  modules: ModuleConfig[];
  onSelect: (moduleId: string) => void;
}

export default function LandingPage({ modules, onSelect }: Props) {
  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-10 h-10" />,
    Headphones: <Headphones className="w-10 h-10" />,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-3">
          So geht's noch besser
        </h1>
        <p className="text-stone-500 text-lg">
          Goethe-/ÖSD-Zertifikat B1 — Prüfungstrainer
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border-2 border-stone-200 shadow-sm hover:border-stone-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="text-stone-600 group-hover:text-stone-800 transition-colors">
              {iconMap[m.icon]}
            </div>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-stone-800">{m.name}</h2>
              <p className="text-stone-500 text-sm mt-1">
                {m.totalQuestions} Fragen · {m.teile} Teile · {m.timeMinutes} Min.
              </p>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-12 text-stone-400 text-xs">
        10 Modelltests pro Modul
      </p>
    </div>
  );
}
