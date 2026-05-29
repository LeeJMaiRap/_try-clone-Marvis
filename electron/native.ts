import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

export type NativeFileRecord = {
  title: string;
  type: 'Document' | 'Image' | 'Spreadsheet' | 'PDF';
  date: string;
  people: string[];
  topics: string[];
  ocr: string;
  path: string;
  size: number;
};

const maxFiles = 300;
const supportedExtensions = new Set(['.txt', '.md', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv', '.png', '.jpg', '.jpeg', '.webp']);

function fileType(extension: string): NativeFileRecord['type'] {
  if (['.png', '.jpg', '.jpeg', '.webp'].includes(extension)) return 'Image';
  if (['.xls', '.xlsx', '.csv'].includes(extension)) return 'Spreadsheet';
  if (extension === '.pdf') return 'PDF';
  return 'Document';
}

function topicsFromName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((part) => part.length > 3)
    .slice(0, 5);
}

export async function scanFolder(folderPath: string): Promise<NativeFileRecord[]> {
  const results: NativeFileRecord[] = [];

  async function walk(currentPath: string, depth: number) {
    if (results.length >= maxFiles || depth > 2) return;
    const entries = await readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (results.length >= maxFiles) return;
      if (entry.name.startsWith('.')) continue;

      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath, depth + 1);
        continue;
      }

      if (!entry.isFile()) continue;
      const extension = path.extname(entry.name).toLowerCase();
      if (!supportedExtensions.has(extension)) continue;

      const metadata = await stat(entryPath);
      const title = entry.name;
      const topics = topicsFromName(title);
      results.push({
        title,
        type: fileType(extension),
        date: metadata.mtime.toISOString().slice(0, 10),
        people: ['Local device'],
        topics: topics.length ? topics : ['local'],
        ocr: `${title} • ${Math.round(metadata.size / 1024)} KB • ${path.dirname(entryPath)}`,
        path: entryPath,
        size: metadata.size,
      });
    }
  }

  await walk(folderPath, 0);
  return results;
}
