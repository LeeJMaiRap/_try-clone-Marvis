import { Search } from 'lucide-react';
import { fileRecords as mockFileRecords } from '../data';
import type { FileRecord } from '../types/agentRoom';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  records?: FileRecord[];
};

export function FileIntelligence({ query, onQueryChange, records }: Props) {
  const source = records?.length ? records : mockFileRecords;
  const normalized = query.trim().toLowerCase();
  const results = source.filter((file) => {
    const haystack = [file.title, file.type, file.date, file.ocr, file.path ?? '', ...file.people, ...file.topics].join(' ').toLowerCase();
    return !normalized || haystack.includes(normalized);
  });

  return (
    <section id="files" className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">File intelligence</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Search local room context.</h2>
          <p className="mt-2 text-sm text-slate-400">{records?.length ? `${records.length} native files scanned.` : 'Mock fallback active until folder scan.'}</p>
        </div>
        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Try budget, travel, contract, system..." className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60" />
        </label>
      </div>
      <div className="grid max-h-[24rem] gap-3 overflow-y-auto pr-1">
        {results.map((file) => (
          <article key={file.path ?? file.title} className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="truncate font-semibold text-white" title={file.title}>{file.title}</h3>
              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-100">{file.type}</span>
            </div>
            <p className="line-clamp-2 text-sm text-slate-400">{file.ocr}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[file.date, ...file.people, ...file.topics].map((tag) => (
                <span key={`${file.title}-${tag}`} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && <p className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-slate-400">No local files match this query.</p>}
    </section>
  );
}
