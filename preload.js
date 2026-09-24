// Intentionally minimal. The app currently only needs localStorage,
// which is available in the renderer without any preload bridge.
// Add contextBridge.exposeInMainWorld(...) here later if you want
// the app to read/write files on disk (e.g. native export/import).

// Bridges native menu bar clicks (File/Edit/View, added in v1.2.0) into the
// renderer as synthetic keydown events matching the app's existing keyboard
// shortcuts, so menu items and their equivalent Cmd-shortcuts share one
// code path in index.html and never run app logic from the main process.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronMenu', {
  onAction: (callback) => ipcRenderer.on('menu-action', (_event, action) => callback(action)),
})
