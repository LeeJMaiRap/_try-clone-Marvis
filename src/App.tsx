import { useState } from 'react';
import { AssistantConsole } from './components/AssistantConsole';
import { CapabilityGrid } from './components/CapabilityGrid';
import { FileIntelligence } from './components/FileIntelligence';
import { Hero } from './components/Hero';
import { PrivacyModeToggle } from './components/PrivacyModeToggle';
import { RemoteCompanion } from './components/RemoteCompanion';
import { TaskTemplates } from './components/TaskTemplates';

export default function App() {
  const [mode, setMode] = useState<'local' | 'cloud'>('local');
  const [prompt, setPrompt] = useState('');
  const [fileQuery, setFileQuery] = useState('');

  function selectPrompt(nextPrompt: string) {
    setPrompt(nextPrompt);
    document.getElementById('assistant')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300 font-black text-slate-950">N</div>
          <div>
            <p className="font-semibold text-white">NovaDesk AI</p>
            <p className="text-xs text-slate-400">Original Marvis-inspired MVP</p>
          </div>
        </div>
        <div className="hidden gap-5 text-sm text-slate-300 md:flex">
          <a href="#assistant" className="hover:text-white">Assistant</a>
          <a href="#files" className="hover:text-white">Files</a>
          <a href="#capabilities" className="hover:text-white">Capabilities</a>
        </div>
      </nav>

      <Hero />
      <PrivacyModeToggle mode={mode} onChange={setMode} />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" id="capabilities">
        <AssistantConsole prompt={prompt} mode={mode} onPromptChange={setPrompt} onSearchRequest={setFileQuery} />
        <div className="flex flex-col gap-6">
          <TaskTemplates onSelectPrompt={selectPrompt} />
          <RemoteCompanion />
        </div>
      </div>

      <FileIntelligence query={fileQuery} onQueryChange={setFileQuery} />
      <CapabilityGrid onSelectPrompt={selectPrompt} />

      <footer className="pb-8 pt-4 text-center text-sm text-slate-500">
        Built as original local prototype. No proprietary Marvis assets or code used.
      </footer>
    </main>
  );
}
