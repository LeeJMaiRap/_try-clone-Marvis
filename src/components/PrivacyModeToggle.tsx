import { Cloud, LockKeyhole } from 'lucide-react';
import { trustSignals } from '../data';

type Props = {
  mode: 'local' | 'cloud';
  onChange: (mode: 'local' | 'cloud') => void;
};

export function PrivacyModeToggle({ mode, onChange }: Props) {
  const isLocal = mode === 'local';

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Privacy core</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Choose how assistant thinks.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            {isLocal ? 'Local mode keeps file intelligence on device for private search demos.' : 'Cloud assist mode simulates faster reasoning for broad tasks and summaries.'}
          </p>
        </div>
        <div className="grid grid-cols-2 rounded-2xl border border-white/10 bg-slate-950/70 p-1">
          <button onClick={() => onChange('local')} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${isLocal ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}>
            <LockKeyhole className="h-4 w-4" /> Local
          </button>
          <button onClick={() => onChange('cloud')} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${!isLocal ? 'bg-violet-300 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}>
            <Cloud className="h-4 w-4" /> Cloud
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {trustSignals.map(({ icon: Icon, label, text }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <Icon className="h-5 w-5 text-cyan-200" />
            <h3 className="mt-3 font-semibold text-white">{label}</h3>
            <p className="mt-1 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
