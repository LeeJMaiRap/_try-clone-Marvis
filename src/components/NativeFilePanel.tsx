import { FolderOpen, Loader2 } from 'lucide-react';
import type { FileRecord } from '../types/agentRoom';

type Props = {
  folderPath: string;
  files: FileRecord[];
  isScanning: boolean;
  error: string;
  onPickFolder: () => void;
};

export function NativeFilePanel({ folderPath, files, isScanning, error, onPickFolder }: Props) {
  const nativeReady = Boolean(window.agentRoom);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Native files</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Local folder scan.</h2>
        </div>
        <button onClick={onPickFolder} disabled={!nativeReady || isScanning} className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">
          {isScanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderOpen className="h-4 w-4" />}
          Choose
        </button>
      </div>
      {!nativeReady && <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">Native bridge unavailable in browser preview. Use desktop app.</p>}
      {error && <p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-100">{error}</p>}
      {folderPath && <p className="mt-3 truncate rounded-2xl bg-slate-950/55 p-3 text-xs text-slate-400" title={folderPath}>{folderPath}</p>}
      <div className="mt-4 grid gap-2">
        {files.slice(0, 5).map((file) => (
          <div key={file.path ?? file.title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
            <p className="truncate text-sm font-semibold text-white" title={file.title}>{file.title}</p>
            <p className="text-xs text-slate-500">{file.type} · {file.date}</p>
          </div>
        ))}
      </div>
      {files.length > 5 && <p className="mt-3 text-xs text-slate-500">+{files.length - 5} more indexed files</p>}
    </section>
  );
}
