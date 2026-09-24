const { app, BrowserWindow, Menu, shell, dialog } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

let mainWindow = null
let manualUpdateCheck = false

function send(win, action) {
  if (win && win.webContents) win.webContents.send('menu-action', action)
}

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function checkForUpdates(manual) {
  if (!app.isPackaged) {
    if (manual) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        message: 'Update checks only run in the installed app, not during development.',
      })
    }
    return
  }
  manualUpdateCheck = manual
  autoUpdater.checkForUpdates().catch((err) => {
    if (manualUpdateCheck) {
      dialog.showMessageBox(mainWindow, {
        type: 'error',
        message: 'Update check failed',
        detail: String((err && err.message) || err),
      })
    }
    manualUpdateCheck = false
  })
}

autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    message: `Version ${info.version} is downloading in the background.`,
    detail: "You'll be prompted to restart once it's ready to install.",
    buttons: ['OK'],
  })
})

autoUpdater.on('update-not-available', () => {
  if (manualUpdateCheck) {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      message: "You're on the latest version.",
    })
  }
  manualUpdateCheck = false
})

autoUpdater.on('error', (err) => {
  if (manualUpdateCheck) {
    dialog.showMessageBox(mainWindow, {
      type: 'error',
      message: 'Update check failed',
      detail: String((err && err.message) || err),
    })
  }
  manualUpdateCheck = false
})

autoUpdater.on('update-downloaded', (info) => {
  dialog
    .showMessageBox(mainWindow, {
      type: 'info',
      message: `Version ${info.version} has been downloaded.`,
      detail: 'Restart now to install it, or it will install automatically the next time you quit the app.',
      buttons: ['Restart Now', 'Later'],
      defaultId: 0,
      cancelId: 1,
    })
    .then(({ response }) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
})

function buildMenu(win) {
  const isMac = process.platform === 'darwin'

  const template = [
    ...(isMac
      ? [
          {
            label: app.getName(),
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { label: 'Check for Updates\u2026', click: () => checkForUpdates(true) },
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
        { label: 'New Budget', click: () => send(win, 'new-budget') },
        { label: 'Export & Share\u2026', click: () => send(win, 'export') },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', click: () => send(win, 'undo') },
        { label: 'Redo', click: () => send(win, 'redo') },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
        { type: 'separator' },
        { label: 'Find\u2026', click: () => send(win, 'find') },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Setup\u2026', click: () => send(win, 'setup') },
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
    ...(!isMac
      ? [
          {
            label: 'Help',
            submenu: [{ label: 'Check for Updates\u2026', click: () => checkForUpdates(true) }],
          },
        ]
      : []),
  ]

  return Menu.buildFromTemplate(template)
}

function createWindow() {
  const win = new BrowserWindow({
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

  Menu.setApplicationMenu(buildMenu(win))

  win.loadFile('index.html')

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  win.once('ready-to-show', () => {
    setTimeout(() => checkForUpdates(false), 3000)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
