import { BookOpen, BriefcaseBusiness, FileSearch, Gamepad2, Newspaper, Plane, Settings, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Capability = {
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
  accent: string;
};

export type FileRecord = {
  title: string;
  type: 'Document' | 'Image' | 'Spreadsheet' | 'PDF';
  date: string;
  people: string[];
  topics: string[];
  ocr: string;
};

export const capabilities: Capability[] = [
  { title: 'Document analyst', description: 'Summarize contracts, spreadsheets, decks, and meeting notes.', prompt: 'Summarize my Q2 contract risks and action items.', icon: BriefcaseBusiness, accent: 'from-sky-400 to-cyan-300' },
  { title: 'System helper', description: 'Explain PC status, suggest cleanup, and guide settings changes.', prompt: 'Check why my laptop feels slow and suggest safe cleanup steps.', icon: Settings, accent: 'from-violet-400 to-fuchsia-300' },
  { title: 'Study copilot', description: 'Organize papers, notes, flashcards, and reading plans.', prompt: 'Build a 7-day study plan from my AI papers folder.', icon: BookOpen, accent: 'from-emerald-400 to-teal-300' },
  { title: 'Game tracker', description: 'Track daily rewards, events, builds, and team plans.', prompt: 'Plan today game dailies and notify me about expiring rewards.', icon: Gamepad2, accent: 'from-orange-400 to-amber-300' },
  { title: 'News watcher', description: 'Monitor industries, keywords, creators, and public updates.', prompt: 'Watch AI chip news and prepare a morning digest.', icon: Newspaper, accent: 'from-rose-400 to-pink-300' },
  { title: 'Trip planner', description: 'Turn saved places, screenshots, and dates into an itinerary.', prompt: 'Create a 3-day Da Nang itinerary from my saved screenshots.', icon: Plane, accent: 'from-indigo-400 to-blue-300' },
];

export const templates = [
  'Find files about launch budget from last month',
  'Summarize screenshots with travel places',
  'Review this contract for payment risks',
  'Create a study plan from papers and notes',
  'Check PC storage and suggest cleanup',
  'Watch game events ending this week',
];

export const fileRecords: FileRecord[] = [
  { title: 'Q2 launch budget.xlsx', type: 'Spreadsheet', date: '2026-05-12', people: ['Linh', 'Minh'], topics: ['launch', 'budget', 'forecast'], ocr: 'Paid media, creator spend, contingency budget' },
  { title: 'Supplier contract draft.pdf', type: 'PDF', date: '2026-05-07', people: ['Legal team'], topics: ['contract', 'payment', 'risk'], ocr: 'Net 30 payment, renewal clause, liability cap' },
  { title: 'Da Nang cafe screenshot.png', type: 'Image', date: '2026-04-29', people: ['Anh'], topics: ['travel', 'coffee', 'map'], ocr: 'Han river, rooftop cafe, opening hours 8:00-22:00' },
  { title: 'AI papers reading list.docx', type: 'Document', date: '2026-05-18', people: ['Research group'], topics: ['study', 'paper', 'agent'], ocr: 'Tool use, memory, retrieval, evaluation checklist' },
  { title: 'Windows cleanup notes.md', type: 'Document', date: '2026-05-23', people: ['Device'], topics: ['system', 'storage', 'network'], ocr: 'Temp files, startup apps, DNS cache, driver update' },
];

export const trustSignals = [
  { icon: ShieldCheck, label: 'Local-first index', text: 'Search demo keeps sample files on device.' },
  { icon: FileSearch, label: 'File intelligence', text: 'Query title, OCR, people, date, and topics.' },
];
