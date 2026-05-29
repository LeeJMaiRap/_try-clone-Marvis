import { WandSparkles } from 'lucide-react';
import { templates } from '../data';

type Props = {
  onSelectPrompt: (prompt: string) => void;
};

export function TaskTemplates({ onSelectPrompt }: Props) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-300/15 p-3 text-cyan-200">
          <WandSparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Task templates</p>
          <h2 className="text-2xl font-semibold text-white">Start from real scenarios.</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {templates.map((template) => (
          <button key={template} onClick={() => onSelectPrompt(template)} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-200/50 hover:bg-cyan-300/10 hover:text-cyan-100">
            {template}
          </button>
        ))}
      </div>
    </section>
  );
}
