import type { FileRecord } from './agentRoom';

declare global {
  interface Window {
    agentRoom?: {
      chooseFolder: () => Promise<string | null>;
      scanFolder: (folderPath: string) => Promise<FileRecord[]>;
    };
  }
}

export {};
