import type { LucideIcon } from 'lucide-react';

export type Mode = 'local' | 'cloud';

export type FileRecord = {
  title: string;
  type: 'Document' | 'Image' | 'Spreadsheet' | 'PDF';
  date: string;
  people: string[];
  topics: string[];
  ocr: string;
  path?: string;
  size?: number;
};

export type Capability = {
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
  accent: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  agent: string;
  status: 'active' | 'idle' | 'watching';
};

export type TaskItem = {
  title: string;
  roomId: string;
  progress: number;
  state: 'running' | 'queued' | 'ready';
};
