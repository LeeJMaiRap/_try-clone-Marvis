import { Bot, CircleDot, LayoutGrid } from 'lucide-react';
import type { Room } from '../types/agentRoom';

type Props = {
  rooms: Room[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
};

export function RoomSidebar({ rooms, activeRoomId, onSelectRoom }: Props) {
  return (
    <aside className="flex h-full flex-col border-r border-white/10 bg-slate-950/70 p-4">
      <div className="mb-6 flex items-center gap-3 rounded-3xl bg-white/[0.06] p-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 font-black text-slate-950">AR</div>
        <div>
          <p className="font-semibold text-white">Agent Room</p>
          <p className="text-xs text-slate-400">Native desktop v1</p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        <LayoutGrid className="h-4 w-4" /> Rooms
      </div>
      <div className="space-y-2">
        {rooms.map((room) => {
          const active = room.id === activeRoomId;
          return (
            <button key={room.id} onClick={() => onSelectRoom(room.id)} className={`w-full rounded-3xl border p-4 text-left transition ${active ? 'border-cyan-200/50 bg-cyan-300/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'}`}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-semibold text-white">{room.name}</span>
                <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] ${room.status === 'active' ? 'bg-emerald-400/15 text-emerald-200' : room.status === 'watching' ? 'bg-cyan-300/15 text-cyan-200' : 'bg-white/10 text-slate-300'}`}>
                  <CircleDot className="h-3 w-3" /> {room.status}
                </span>
              </div>
              <p className="line-clamp-2 text-xs leading-5 text-slate-400">{room.description}</p>
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-cyan-200"><Bot className="h-3.5 w-3.5" /> {room.agent}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
        Local-first desktop shell. Native bridge exposes folder scan only.
      </div>
    </aside>
  );
}
