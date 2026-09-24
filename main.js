const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { autoUpdater } = require('electron-updater')

let mainWindow = null
let launcherWindow = null
let manualUpdateCheck = false
let mainWindowDirty = false
let mainWindowFilePath = null
let quitAfterSave = false

const BUDGETS_ROOT = path.join(app.getPath('documents'), 'NO LONGER BUDGET')
const RECENT_PATH = path.join(app.getPath('userData'), 'recent-files.json')
const MIGRATION_FLAG_PATH = path.join(app.getPath('userData'), 'migrated-to-files.json')

function send(win, action, payload) {
  if (win && win.webContents) win.webContents.send('menu-action', action, payload)
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function sanitizeName(name) {
  return String(name || 'Untitled')
    .trim()
    .replace(/[\/\\:*?"<>|]/g, '-')
    .slice(0, 120) || 'Untitled'
}

function uniquePath(dir, baseName, ext) {
  ensureDir(dir)
  var candidate = path.join(dir, baseName + ext)
  var n = 2
  while (fs.existsSync(candidate)) {
    candidate = path.join(dir, baseName + ' (' + n + ')' + ext)
    n++
  }
  return candidate
}

function listBudgets() {
  ensureDir(BUDGETS_ROOT)
  var result = { root: BUDGETS_ROOT, folders: [], files: [] }
  var entries = fs.readdirSync(BUDGETS_ROOT, { withFileTypes: true })
  entries.forEach(function (entry) {
    if (entry.isDirectory()) {
      result.folders.push(entry.name)
      var sub = path.join(BUDGETS_ROOT, entry.name)
      fs.readdirSync(sub, { withFileTypes: true }).forEach(function (fentry) {
        if (fentry.isFile() && fentry.name.toLowerCase().endsWith('.nlb')) {
          var fp = path.join(sub, fentry.name)
          var stat = fs.statSync(fp)
          result.files.push({
            name: fentry.name.replace(/\.nlb$/i, ''),
            path: fp,
            folder: entry.name,
            mtimeMs: stat.mtimeMs,
            size: stat.size,
          })
        }
      })
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.nlb')) {
      var fp2 = path.join(BUDGETS_ROOT, entry.name)
      var stat2 = fs.statSync(fp2)
      result.files.push({
        name: entry.name.replace(/\.nlb$/i, ''),
        path: fp2,
        folder: null,
        mtimeMs: stat2.mtimeMs,
        size: stat2.size,
      })
    }
  })
  return result
}

function readRecent() {
  try {
    return JSON.parse(fs.readFileSync(RECENT_PATH, 'utf8'))
  } catch (e) {
    return []
  }
}

function pushRecent(filePath) {
  var list = readRecent().filter(function (p) { return p !== filePath })
  list.unshift(filePath)
  list = list.slice(0, 8)
  try {
    ensureDir(path.dirname(RECENT_PATH))
    fs.writeFileSync(RECENT_PATH, JSON.stringify(list))
  } catch (e) {}
  buildAndSetMenu()
  return list
}

// ---- IPC: file operations ----

ipcMain.handle('budgets:list', function () {
  return listBudgets()
})

ipcMain.handle('budgets:read', function (_e, filePath) {
  var data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  pushRecent(filePath)
  return { path: filePath, budget: data }
})

ipcMain.handle('budgets:save', function (_e, filePath, budget) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(budget))
  pushRecent(filePath)
  return { path: filePath }
})

ipcMain.handle('budgets:create', function (_e, folderName, name, budget) {
  var dir = folderName ? path.join(BUDGETS_ROOT, sanitizeName(folderName)) : BUDGETS_ROOT
  var fp = uniquePath(dir, sanitizeName(name || 'Untitled Budget'), '.nlb')
  fs.writeFileSync(fp, JSON.stringify(budget))
  pushRecent(fp)
  return { path: fp }
})

ipcMain.handle('budgets:rename', function (_e, filePath, newName) {
  var dir = path.dirname(filePath)
  var fp = uniquePath(dir, sanitizeName(newName), '.nlb')
  fs.renameSync(filePath, fp)
  return { path: fp }
})

ipcMain.handle('budgets:duplicate', function (_e, filePath) {
  var dir = path.dirname(filePath)
  var base = path.basename(filePath, '.nlb') + ' copy'
  var fp = uniquePath(dir, sanitizeName(base), '.nlb')
  fs.copyFileSync(filePath, fp)
  return { path: fp }
})

ipcMain.handle('budgets:delete', function (_e, filePath) {
  try {
    shell.trashItem(filePath)
  } catch (e) {
    fs.unlinkSync(filePath)
  }
  return true
})

ipcMain.handle('budgets:move', function (_e, filePath, newFolderName) {
  var dir = newFolderName ? path.join(BUDGETS_ROOT, sanitizeName(newFolderName)) : BUDGETS_ROOT
  var fp = uniquePath(dir, path.basename(filePath, '.nlb'), '.nlb')
  ensureDir(dir)
  fs.renameSync(filePath, fp)
  return { path: fp }
})

ipcMain.handle('folders:create', function (_e, name) {
  var dir = path.join(BUDGETS_ROOT, sanitizeName(name))
  ensureDir(dir)
  return { name: sanitizeName(name) }
})

ipcMain.handle('folders:rename', function (_e, oldName, newName) {
  var oldDir = path.join(BUDGETS_ROOT, oldName)
  var newDir = path.join(BUDGETS_ROOT, sanitizeName(newName))
  fs.renameSync(oldDir, newDir)
  return { name: sanitizeName(newName) }
})

ipcMain.handle('folders:delete', function (_e, name) {
  var dir = path.join(BUDGETS_ROOT, name)
  // Move any budgets inside back to root before removing the folder, so nothing is lost.
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function (f) {
      var from = path.join(dir, f)
      var to = uniquePath(BUDGETS_ROOT, path.basename(f, '.nlb'), '.nlb')
      fs.renameSync(from, to)
    })
    fs.rmdirSync(dir)
  }
  return true
})

ipcMain.handle('app:getRoot', function () {
  ensureDir(BUDGETS_ROOT)
  return BUDGETS_ROOT
})

ipcMain.handle('app:revealInFolder', function (_e, filePath) {
  shell.showItemInFolder(filePath)
  return true
})

ipcMain.handle('app:getRecent', function () {
  return readRecent().filter(function (p) { return fs.existsSync(p) })
})

ipcMain.handle('app:getVersion', function () {
  return app.getVersion()
})

ipcMain.handle('app:isMigrated', function () {
  return fs.existsSync(MIGRATION_FLAG_PATH)
})

ipcMain.handle('app:setMigrated', function () {
  ensureDir(path.dirname(MIGRATION_FLAG_PATH))
  fs.writeFileSync(MIGRATION_FLAG_PATH, JSON.stringify({ migrated: true, at: new Date().toISOString() }))
  return true
})

ipcMain.handle('app:migrateBudgets', function (_e, budgets, folders) {
  // budgets: [{ name, folderId, data }], folders: [{ id, name }]
  var folderNameById = {}
  ;(folders || []).forEach(function (f) { folderNameById[f.id] = sanitizeName(f.name) })
  var written = []
  ;(budgets || []).forEach(function (b) {
    var folderName = b.folderId ? folderNameById[b.folderId] : null
    var dir = folderName ? path.join(BUDGETS_ROOT, folderName) : BUDGETS_ROOT
    var fp = uniquePath(dir, sanitizeName(b.name || 'Untitled Budget'), '.nlb')
    fs.writeFileSync(fp, JSON.stringify(b.data))
    written.push(fp)
  })
  return written
})

ipcMain.handle('window:reportDirty', function (_e, dirty) {
  mainWindowDirty = !!dirty
  return true
})

ipcMain.handle('window:setCurrentPath', function (_e, filePath) {
  mainWindowFilePath = filePath || null
  return true
})

ipcMain.handle('dialog:openFile', function () {
  var res = dialog.showOpenDialogSync(mainWindow, {
    title: 'Open Budget',
    defaultPath: BUDGETS_ROOT,
    filters: [{ name: 'NO LONGER BUDGET files', extensions: ['nlb'] }],
    properties: ['openFile'],
  })
  return res && res[0] ? res[0] : null
})

ipcMain.handle('dialog:saveFileAs', function (_e, suggestedName) {
  var res = dialog.showSaveDialogSync(mainWindow, {
    title: 'Save Budget As',
    defaultPath: path.join(BUDGETS_ROOT, sanitizeName(suggestedName || 'Untitled Budget') + '.nlb'),
    filters: [{ name: 'NO LONGER BUDGET files', extensions: ['nlb'] }],
  })
  return res || null
})

// ---- Launcher / main window lifecycle ----

function createLauncherWindow() {
  if (launcherWindow) { launcherWindow.focus(); return }
  launcherWindow = new BrowserWindow({
    width: 860,
    height: 640,
    minWidth: 560,
    minHeight: 420,
    title: 'NO LONGER BUDGET',
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  Menu.setApplicationMenu(buildMenu(null))
  launcherWindow.loadFile('launcher.html')
  launcherWindow.on('closed', function () { launcherWindow = null })
}

function openBudgetInMainWindow(filePath) {
  if (launcherWindow) { launcherWindow.close() }
  createMainWindow(filePath)
}

function createMainWindow(initialFilePath) {
  if (mainWindow) {
    mainWindow.focus()
    if (initialFilePath) send(mainWindow, 'load-file', { path: initialFilePath })
    return
  }
  var win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    title: 'NO LONGER BUDGET',
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow = win
  mainWindowFilePath = initialFilePath || null

  Menu.setApplicationMenu(buildMenu(win))

  win.loadFile('index.html')

  win.webContents.setWindowOpenHandler(function (details) {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  win.webContents.once('did-finish-load', function () {
    if (initialFilePath) send(win, 'load-file', { path: initialFilePath })
  })

  win.once('ready-to-show', function () {
    setTimeout(function () { checkForUpdates(false) }, 3000)
  })

  win.on('close', function (e) {
    if (quitAfterSave) return
    if (!mainWindowDirty) return
    e.preventDefault()
    var choice = dialog.showMessageBoxSync(win, {
      type: 'warning',
      buttons: ['Save', "Don't Save", 'Cancel'],
      defaultId: 0,
      cancelId: 2,
      message: 'Save changes to this budget before closing?',
      detail: 'Your changes will be lost if you don\u2019t save them.',
    })
    if (choice === 2) return
    if (choice === 1) {
      quitAfterSave = true
      win.close()
      return
    }
    // Save, then close once renderer confirms.
    send(win, 'save-then-close')
    ipcMain.once('window:saved-then-close', function () {
      quitAfterSave = true
      if (mainWindow) mainWindow.close()
    })
  })

  win.on('closed', function () {
    mainWindow = null
    mainWindowDirty = false
    mainWindowFilePath = null
    quitAfterSave = false
    if (BrowserWindow.getAllWindows().length === 0) createLauncherWindow()
  })
}

// ---- Auto-update (unchanged) ----

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function activeWin() {
  return mainWindow || launcherWindow
}

function checkForUpdates(manual) {
  if (!app.isPackaged) {
    if (manual) {
      dialog.showMessageBox(activeWin(), {
        type: 'info',
        message: 'Update checks only run in the installed app, not during development.',
      })
    }
    return
  }
  manualUpdateCheck = manual
  autoUpdater.checkForUpdates().catch(function (err) {
    if (manualUpdateCheck) {
      dialog.showMessageBox(activeWin(), {
        type: 'error',
        message: 'Update check failed',
        detail: String((err && err.message) || err),
      })
    }
    manualUpdateCheck = false
  })
}

autoUpdater.on('update-available', function (info) {
  dialog.showMessageBox(activeWin(), {
    type: 'info',
    message: 'Version ' + info.version + ' is downloading in the background.',
    detail: "You'll be prompted to restart once it's ready to install.",
    buttons: ['OK'],
  })
})

autoUpdater.on('update-not-available', function () {
  if (manualUpdateCheck) {
    dialog.showMessageBox(activeWin(), {
      type: 'info',
      message: "You're on the latest version.",
    })
  }
  manualUpdateCheck = false
})

autoUpdater.on('error', function (err) {
  if (manualUpdateCheck) {
    dialog.showMessageBox(activeWin(), {
      type: 'error',
      message: 'Update check failed',
      detail: String((err && err.message) || err),
    })
  }
  manualUpdateCheck = false
})

autoUpdater.on('update-downloaded', function (info) {
  dialog
    .showMessageBox(activeWin(), {
      type: 'info',
      message: 'Version ' + info.version + ' has been downloaded.',
      detail: 'Restart now to install it, or it will install automatically the next time you quit the app.',
      buttons: ['Restart Now', 'Later'],
      defaultId: 0,
      cancelId: 1,
    })
    .then(function (result) {
      if (result.response === 0) autoUpdater.quitAndInstall()
    })
})

// ---- Menu ----

function showAbout() {
  dialog.showMessageBox(activeWin(), {
    type: 'info',
    title: 'About NO LONGER BUDGET',
    message: 'NO LONGER BUDGET',
    detail:
      'Version ' + app.getVersion() + '\n\n' +
      'A desktop line-item budgeting app for film & TV production, built by No Longer Network.\n\n' +
      'Budgets are saved as .nlb files in:\n' + BUDGETS_ROOT,
    buttons: ['OK'],
  })
}

function showShortcuts() {
  dialog.showMessageBox(activeWin(), {
    type: 'info',
    title: 'Keyboard Shortcuts',
    message: 'Keyboard Shortcuts',
    detail:
      '\u2318S \u2013 Save\n' +
      '\u2318\u21e7S \u2013 Save As\u2026\n' +
      '\u2318O \u2013 Open\u2026\n' +
      '\u2318\u21e7N \u2013 New Budget File\n' +
      '\u2318N \u2013 New Budget (Same Folder)\n' +
      '\u2318Z / \u2318\u21e7Z \u2013 Undo / Redo\n' +
      '\u2318F \u2013 Find\n' +
      '\u2318E \u2013 Export & Share\n' +
      '\u2318M \u2013 Setup menu (Globals, Units, Fringes, Groups)',
    buttons: ['OK'],
  })
}

function buildMenu(win) {
  const isMac = process.platform === 'darwin'
  const recent = readRecent().filter(function (p) { return fs.existsSync(p) })

  const recentSubmenu = recent.length
    ? recent.map(function (p) {
        return { label: path.basename(p, '.nlb'), click: function () { openBudgetInMainWindow(p) } }
      })
    : [{ label: 'No Recent Budgets', enabled: false }]

  const helpSubmenu = [
    { label: 'NO LONGER BUDGET Help', click: function () { send(win, 'open-help') } },
    { label: 'Keyboard Shortcuts', click: showShortcuts },
    { type: 'separator' },
    { label: 'Show Budgets Folder', click: function () { shell.openPath(BUDGETS_ROOT) } },
    { label: 'View README on GitHub', click: function () { shell.openExternal('https://github.com/NikitaBelomestnykh/nlb-budget#readme') } },
    { label: 'Report an Issue\u2026', click: function () { shell.openExternal('https://github.com/NikitaBelomestnykh/nlb-budget/issues/new') } },
    { type: 'separator' },
    { label: 'Check for Updates\u2026', click: function () { checkForUpdates(true) } },
  ]

  const template = [
    ...(isMac
      ? [
          {
            label: app.getName(),
            submenu: [
              { label: 'About NO LONGER BUDGET', click: showAbout },
              { type: 'separator' },
              { label: 'Check for Updates\u2026', click: function () { checkForUpdates(true) } },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        { label: 'New Budget File\u2026', accelerator: 'CmdOrCtrl+Shift+N', click: function () { if (launcherWindow) send(launcherWindow, 'new-file'); else createLauncherWindow() } },
        { label: 'New Budget (Same Folder)', accelerator: 'CmdOrCtrl+N', click: function () { send(win, 'new-budget') } },
        { type: 'separator' },
        { label: 'Open\u2026', accelerator: 'CmdOrCtrl+O', click: function () { send(win, 'open-file') } },
        { label: 'Open Recent', submenu: recentSubmenu },
        { label: 'Show All Budgets\u2026', click: function () { createLauncherWindow() } },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: function () { send(win, 'save') } },
        { label: 'Save As\u2026', accelerator: 'CmdOrCtrl+Shift+S', click: function () { send(win, 'save-as') } },
        { type: 'separator' },
        { label: 'Export & Share\u2026', accelerator: 'CmdOrCtrl+E', click: function () { send(win, 'export') } },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', click: function () { send(win, 'undo') } },
        { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', click: function () { send(win, 'redo') } },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
        { type: 'separator' },
        { label: 'Find\u2026', accelerator: 'CmdOrCtrl+F', click: function () { send(win, 'find') } },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Setup\u2026', accelerator: 'CmdOrCtrl+M', click: function () { send(win, 'setup') } },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    { role: 'windowMenu' },
    { label: 'Help', submenu: helpSubmenu },
  ]

  return Menu.buildFromTemplate(template)
}

function buildAndSetMenu() {
  Menu.setApplicationMenu(buildMenu(mainWindow))
}

app.whenReady().then(function () {
  ensureDir(BUDGETS_ROOT)
  createLauncherWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createLauncherWindow()
  })
})

ipcMain.on('launcher:open-file', function (_e, filePath) {
  openBudgetInMainWindow(filePath)
})

ipcMain.on('launcher:new-file', function (_e, payload) {
  openBudgetInMainWindow(null)
  if (mainWindow) {
    mainWindow.webContents.once('did-finish-load', function () {
      send(mainWindow, 'new-file-created', payload)
    })
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
