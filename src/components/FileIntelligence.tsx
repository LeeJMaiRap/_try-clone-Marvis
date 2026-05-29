import { Search } from 'lucide-react';
import { fileRecords } from '../data';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function FileIntelligence({ query, onQueryChange }: Props) {
  const normalized = query.trim().toLowerCase();
  const results = fileRecords.filter((file) => {
    const haystack = [file.title, file.type, file.date, file.ocr, ...file.people, ...file.topics].join(' ').toLowerCase();
    return !normalized || haystack.includes(normalized);
  });

  return (
    <section id="files" className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">File intelligence</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Search title, OCR, topic, people, date.</h2>
          <p className="mt-2 text-slate-400">Mock local index demonstrates core MVP behavior.</p>
        </div>
        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Try budget, travel, contract, system..." className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60" />
        </label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {results.map((file) => (
          <article key={file.title} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{file.title}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-100">{file.type}</span>
            </div>
            <p className="text-sm text-slate-400">{file.ocr}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[file.date, ...file.people, ...file.topics].map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && <p className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-slate-400">No local mock files match this query.</p>}
    </section>
  );
}
