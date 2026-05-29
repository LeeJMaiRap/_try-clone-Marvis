import { capabilities } from '../data';

type Props = {
  onSelectPrompt: (prompt: string) => void;
};

export function CapabilityGrid({ onSelectPrompt }: Props) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Capabilities</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">One assistant, many daily jobs.</h2>
        </div>
        <p className="max-w-xl text-slate-400">Cards run original prompt templates in local mock assistant.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map(({ title, description, prompt, icon: Icon, accent }) => (
          <button key={title} onClick={() => onSelectPrompt(prompt)} className="group rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-slate-900/80">
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-slate-950`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            <p className="mt-4 text-sm font-semibold text-cyan-200">Run template →</p>
          </button>
        ))}
      </div>
    </section>
  );
}
