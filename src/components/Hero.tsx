import { ArrowRight, MonitorSmartphone, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-sky-950/40 backdrop-blur md:p-10">
      <div className="absolute right-6 top-6 hidden h-48 w-48 rounded-full bg-sky-400/20 blur-3xl md:block" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Always-on desktop AI, built original
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            NovaDesk AI keeps your work, files, and devices in flow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Private local search, task templates, assistant console, and companion device view in one polished MVP.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#assistant" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
              Try console <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#files" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15">
              Explore files
            </a>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
            <span className="flex items-center gap-2"><MonitorSmartphone className="h-4 w-4" /> Device mesh</span>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">online</span>
          </div>
          <div className="space-y-3">
            {['Indexing 1,248 local files', 'Watching study folder', 'Phone companion connected'].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-200">{item}</span>
                  <span className="text-cyan-200">{index === 0 ? '82%' : 'ready'}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" style={{ width: index === 0 ? '82%' : '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
