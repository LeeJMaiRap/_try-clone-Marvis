import type { TaskItem } from '../types/agentRoom';

type Props = {
  roomId: string;
  tasks: TaskItem[];
};

export function TaskBoard({ roomId, tasks }: Props) {
  const roomTasks = tasks.filter((task) => task.roomId === roomId);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Task board</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Room work queue.</h2>
      </div>
      <div className="space-y-3">
        {roomTasks.map((task) => (
          <div key={task.title} className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">{task.title}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{task.state}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" style={{ width: `${task.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">{task.progress}% complete</p>
          </div>
        ))}
        {roomTasks.length === 0 && <p className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400">No queued tasks in this room.</p>}
      </div>
    </section>
  );
}
