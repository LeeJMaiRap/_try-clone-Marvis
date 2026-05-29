import { contextBridge, ipcRenderer } from 'electron';
import type { NativeFileRecord } from './native';

contextBridge.exposeInMainWorld('agentRoom', {
  chooseFolder: (): Promise<string | null> => ipcRenderer.invoke('agent-room:choose-folder'),
  scanFolder: (folderPath: string): Promise<NativeFileRecord[]> => ipcRenderer.invoke('agent-room:scan-folder', folderPath),
});
