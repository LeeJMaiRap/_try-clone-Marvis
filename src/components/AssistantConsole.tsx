import { FormEvent, useMemo, useState } from 'react';
import { Bot, Send, UserRound } from 'lucide-react';
import type { FileRecord, Mode } from '../types/agentRoom';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

type Props = {
  prompt: string;
  mode: Mode;
  roomName?: string;
  files?: FileRecord[];
  onPromptChange: (prompt: string) => void;
  onSearchRequest: (query: string) => void;
};

function respondToPrompt(prompt: string, mode: Mode, files: FileRecord[]) {
  const text = prompt.toLowerCase();
  const prefix = mode === 'local' ? 'Local mode result' : 'Cloud assist result';
  const matchingFiles = files.filter((file) => [file.title, file.ocr, ...file.topics].join(' ').toLowerCase().includes(text.split(' ').find((part) => part.length > 4) ?? text)).slice(0, 3);
  const fileHint = matchingFiles.length ? ` Matched native files: ${matchingFiles.map((file) => file.title).join(', ')}.` : '';

  if (text.includes('budget') || text.includes('launch')) return `${prefix}: found launch/budget context. Suggested next step: review creator spend and contingency budget.${fileHint}`;
  if (text.includes('contract') || text.includes('payment')) return `${prefix}: contract room should inspect payment, renewal, and liability items. Suggested next step: inspect Net 30 and liability cap wording.${fileHint}`;
  if (text.includes('travel') || text.includes('screenshot') || text.includes('da nang')) return `${prefix}: travel context should group places by district and opening time.${fileHint}`;
  if (text.includes('study') || text.includes('paper')) return `${prefix}: study room can schedule papers over 7 days and extract evaluation checkpoints.${fileHint}`;
  if (text.includes('storage') || text.includes('cleanup') || text.includes('slow')) return `${prefix}: safe cleanup candidates are temp files, startup apps, DNS cache, and driver checks. No destructive action taken.${fileHint}`;
  if (text.includes('game') || text.includes('reward')) return `${prefix}: signals room can list expiring rewards, events, and daily tasks from saved notes.${fileHint}`;

  return `${prefix}: I can search local room files, summarize documents, plan tasks, and monitor device status. Try budget, contract, travel, study, system, or game.${fileHint}`;
}

export function AssistantConsole({ prompt, mode, roomName = 'Agent Room', files = [], onPromptChange, onSearchRequest }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Agent Room ready. Choose a room, scan a folder, or launch a task template.' },
  ]);

  const status = useMemo(() => (mode === 'local' ? 'native local reasoning' : 'cloud-assisted planning'), [mode]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = prompt.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { role: 'user', text: value },
      { role: 'assistant', text: respondToPrompt(value, mode, files) },
    ]);
    onSearchRequest(value.split(' ').find((part) => part.length > 4) ?? value);
    onPromptChange('');
  }

  return (
    <section id="assistant" className="flex h-full min-h-0 flex-col rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">{roomName}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Agent command center.</h2>
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">{status}</span>
      </div>
      <div className="mb-4 min-h-[20rem] flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-black/20 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && <div className="mt-1 rounded-full bg-cyan-300/15 p-2 text-cyan-200"><Bot className="h-4 w-4" /></div>}
              <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-cyan-300 text-slate-950' : 'bg-white/10 text-slate-200'}`}>
                {message.text}
              </div>
              {message.role === 'user' && <div className="mt-1 rounded-full bg-white/10 p-2 text-slate-200"><UserRound className="h-4 w-4" /></div>}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="flex gap-3">
        <input value={prompt} onChange={(event) => onPromptChange(event.target.value)} placeholder="Ask Agent Room to find, summarize, monitor, or plan..." className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60" />
        <button className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200" aria-label="Send prompt">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </section>
  );
}
