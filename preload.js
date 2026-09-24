// Bridges native menu bar clicks (File/Edit/View/Help) into the renderer as
// 'menu-action' events, and exposes native file-system operations for the
// one-file-per-budget storage model (each budget is a .nlb file on disk,
// organized into real folders under ~/Documents/NO LONGER BUDGET).
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronMenu', {
  onAction: (callback) => ipcRenderer.on('menu-action', (_event, action, payload) => callback(action, payload)),
  reportSavedThenClose: () => ipcRenderer.send('window:saved-then-close'),
})

contextBridge.exposeInMainWorld('electronLauncher', {
  openFile: (filePath) => ipcRenderer.send('launcher:open-file', filePath),
  newFile: (payload) => ipcRenderer.send('launcher:new-file', payload),
  onAction: (callback) => ipcRenderer.on('menu-action', (_event, action, payload) => callback(action, payload)),
})

contextBridge.exposeInMainWorld('electronFS', {
  listBudgets: () => ipcRenderer.invoke('budgets:list'),
  readBudget: (filePath) => ipcRenderer.invoke('budgets:read', filePath),
  saveBudget: (filePath, budget) => ipcRenderer.invoke('budgets:save', filePath, budget),
  createBudget: (folderName, name, budget) => ipcRenderer.invoke('budgets:create', folderName, name, budget),
  renameBudget: (filePath, newName) => ipcRenderer.invoke('budgets:rename', filePath, newName),
  duplicateBudget: (filePath) => ipcRenderer.invoke('budgets:duplicate', filePath),
  deleteBudget: (filePath) => ipcRenderer.invoke('budgets:delete', filePath),
  moveBudget: (filePath, newFolderName) => ipcRenderer.invoke('budgets:move', filePath, newFolderName),
  createFolder: (name) => ipcRenderer.invoke('folders:create', name),
  renameFolder: (oldName, newName) => ipcRenderer.invoke('folders:rename', oldName, newName),
  deleteFolder: (name) => ipcRenderer.invoke('folders:delete', name),
  getRoot: () => ipcRenderer.invoke('app:getRoot'),
  revealInFolder: (filePath) => ipcRenderer.invoke('app:revealInFolder', filePath),
  getRecent: () => ipcRenderer.invoke('app:getRecent'),
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  isMigrated: () => ipcRenderer.invoke('app:isMigrated'),
  setMigrated: () => ipcRenderer.invoke('app:setMigrated'),
  migrateBudgets: (budgets, folders) => ipcRenderer.invoke('app:migrateBudgets', budgets, folders),
  reportDirty: (dirty) => ipcRenderer.invoke('window:reportDirty', dirty),
  setCurrentPath: (filePath) => ipcRenderer.invoke('window:setCurrentPath', filePath),
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  saveFileAsDialog: (suggestedName) => ipcRenderer.invoke('dialog:saveFileAs', suggestedName),
})
