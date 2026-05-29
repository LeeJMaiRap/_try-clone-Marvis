import { useMemo, useState } from 'react';
import { Activity, MonitorSmartphone } from 'lucide-react';
import { capabilities, rooms, tasks } from '../data';
import type { FileRecord, Mode } from '../types/agentRoom';
import { AssistantConsole } from './AssistantConsole';
import { CapabilityGrid } from './CapabilityGrid';
import { FileIntelligence } from './FileIntelligence';
import { NativeFilePanel } from './NativeFilePanel';
import { PrivacyModeToggle } from './PrivacyModeToggle';
import { RemoteCompanion } from './RemoteCompanion';
import { RoomSidebar } from './RoomSidebar';
import { TaskBoard } from './TaskBoard';
import { TaskTemplates } from './TaskTemplates';

export function AgentRoomShell() {
  const [mode, setMode] = useState<Mode>('local');
  const [prompt, setPrompt] = useState('');
  const [fileQuery, setFileQuery] = useState('');
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].id);
  const [folderPath, setFolderPath] = useState('');
  const [nativeFiles, setNativeFiles] = useState<FileRecord[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');

  const activeRoom = useMemo(() => rooms.find((room) => room.id === activeRoomId) ?? rooms[0], [activeRoomId]);

  function selectPrompt(nextPrompt: string) {
    setPrompt(nextPrompt);
  }

  async function pickFolder() {
    if (!window.agentRoom) return;
    setScanError('');
    const selectedFolder = await window.agentRoom.chooseFolder();
    if (!selectedFolder) return;

    setFolderPath(selectedFolder);
    setIsScanning(true);
    try {
      const files = await window.agentRoom.scanFolder(selectedFolder);
      setNativeFiles(files);
      setFileQuery('');
    } catch (error) {
      setScanError(error instanceof Error ? error.message : 'Could not scan folder.');
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <main className="grid h-screen min-h-0 grid-cols-[20rem_minmax(0,1fr)] overflow-hidden bg-slate-950 text-slate-100">
      <RoomSidebar rooms={rooms} activeRoomId={activeRoomId} onSelectRoom={setActiveRoomId} />

      <section className="flex min-h-0 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Native desktop workspace</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">{activeRoom.name}</h1>
            <p className="text-sm text-slate-400">{activeRoom.description}</p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
            <MonitorSmartphone className="h-4 w-4 text-cyan-200" /> Agent Room desktop
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_25rem] gap-5 overflow-hidden p-5">
          <div className="flex min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <AssistantConsole prompt={prompt} mode={mode} roomName={activeRoom.name} files={nativeFiles} onPromptChange={setPrompt} onSearchRequest={setFileQuery} />
            <div className="grid gap-5 xl:grid-cols-2">
              <TaskTemplates onSelectPrompt={selectPrompt} />
              <TaskBoard roomId={activeRoomId} tasks={tasks} />
            </div>
            <CapabilityGrid onSelectPrompt={selectPrompt} />
          </div>

          <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-200"><Activity className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Active agent</p>
                  <h2 className="text-2xl font-semibold text-white">{activeRoom.agent}</h2>
                </div>
              </div>
            </div>
            <PrivacyModeToggle mode={mode} onChange={setMode} />
            <NativeFilePanel folderPath={folderPath} files={nativeFiles} isScanning={isScanning} error={scanError} onPickFolder={pickFolder} />
            <FileIntelligence query={fileQuery} onQueryChange={setFileQuery} records={nativeFiles} />
            <RemoteCompanion />
          </aside>
        </div>
      </section>
    </main>
  );
}
