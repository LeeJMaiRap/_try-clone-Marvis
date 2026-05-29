import { Smartphone, Wifi } from 'lucide-react';

export function RemoteCompanion() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Companion</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Phone watches PC tasks.</h2>
        </div>
        <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-200">
          <Wifi className="h-5 w-5" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="mx-auto w-full max-w-[15rem] rounded-[2rem] border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/40">
          <div className="rounded-[1.5rem] bg-slate-900 p-4">
            <div className="mb-4 flex items-center gap-2 text-sm text-cyan-100"><Smartphone className="h-4 w-4" /> Nova phone</div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-cyan-300 p-3 text-sm font-semibold text-slate-950">Remote view active</div>
              <div className="rounded-2xl bg-white/10 p-3 text-sm text-slate-300">Summarizing contract.pdf</div>
              <div className="rounded-2xl bg-white/10 p-3 text-sm text-slate-300">PC battery 78%</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {[
            ['Task progress', 'Document summary running on desktop', '68%'],
            ['Remote action', 'Approve safe cleanup suggestion from phone', 'ready'],
            ['Presence', 'Switch control between phone and PC', 'live'],
          ].map(([label, text, state]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{label}</h3>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">{state}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
