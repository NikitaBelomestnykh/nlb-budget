const { app, BrowserWindow, Menu, shell, dialog } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

let mainWindow = null
let manualUpdateCheck = false
let updateCheckInProgress = false
let updateGuideOpen = false
const releasesUrl = 'https://github.com/NikitaBelomestnykh/nlb-budget/releases/latest'

function send(win, action) {
  if (win && win.webContents) win.webContents.send('menu-action', action)
}

// Until Developer ID signing is configured, use the updater only to discover
// releases. Never download through Squirrel.Mac or install on quit.
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

function showUpdateError(err) {
  console.error('Update error:', err)
  return dialog.showMessageBox(mainWindow, {
    type: 'error',
    message: 'Could not check for or open the update',
    detail: String((err && err.message) || err) + '\n\nYou can download releases at: ' + releasesUrl,
  })
}

async function showManualUpdateGuide(version) {
  if (updateGuideOpen) return
  updateGuideOpen = true
  const validVersion = typeof version === 'string' && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)
  const downloadPage = validVersion
    ? 'https://github.com/NikitaBelomestnykh/nlb-budget/releases/tag/v' + encodeURIComponent(version)
    : releasesUrl
  try {
    const { response } = await dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update NO LONGER BUDGET',
      message: validVersion ? `NO LONGER BUDGET ${version} is available` : 'How to update NO LONGER BUDGET',
      detail: [
        'Updates are installed manually for now. Nothing will download or restart automatically.',
        '',
        '1. Back up each important budget: Export & Share → Export .nlb.',
        '2. Click Open Download Page below. Under Assets, download the arm64.dmg installer (Apple Silicon Macs only).',
        '3. When the download finishes, quit NO LONGER BUDGET with Cmd+Q.',
        '4. Open the .dmg, drag NO LONGER BUDGET into Applications, and choose Replace. Do not delete the app’s data or use an uninstaller.',
        '5. Reopen the app from Applications and check the version and your budgets.',
        '',
        'If macOS blocks opening this beta: cancel the warning, then use System Settings → Privacy & Security → Open Anyway for NO LONGER BUDGET, if offered. Do not disable macOS security.',
        '',
        'You can reopen these instructions from the app menu → How to Update…',
      ].join('\n'),
      buttons: ['Open Download Page', 'Later'],
      defaultId: 0,
      cancelId: 1,
    })
    if (response === 0) await shell.openExternal(downloadPage)
  } catch (err) {
    await showUpdateError(err)
  } finally {
    updateGuideOpen = false
  }
}

async function checkForUpdates(manual) {
  if (!app.isPackaged) {
    if (manual) await dialog.showMessageBox(mainWindow, {
      type: 'info',
      message: 'Update checks only run in the installed app, not during development.',
    })
    return
  }
  if (updateCheckInProgress) return
  updateCheckInProgress = true
  manualUpdateCheck = manual
  try {
    await autoUpdater.checkForUpdates()
  } catch (err) {
    // The error event normally handles this; the flag prevents duplicate dialogs.
    if (manualUpdateCheck) {
      manualUpdateCheck = false
      await showUpdateError(err)
    }
  } finally {
    updateCheckInProgress = false
    manualUpdateCheck = false
  }
}

autoUpdater.on('update-available', (info) => {
  manualUpdateCheck = false
  void showManualUpdateGuide(info.version)
})

autoUpdater.on('update-not-available', () => {
  if (manualUpdateCheck) {
    void dialog.showMessageBox(mainWindow, {
      type: 'info',
      message: "You're on the latest version.",
      detail: `Installed version: ${app.getVersion()}`,
    })
  }
  manualUpdateCheck = false
})

autoUpdater.on('error', (err) => {
  console.error('Update check failed:', err)
  if (manualUpdateCheck) {
    manualUpdateCheck = false
    void showUpdateError(err)
  }
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
              { label: 'How to Update\u2026', click: () => showManualUpdateGuide() },
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
            submenu: [
              { label: 'Check for Updates\u2026', click: () => checkForUpdates(true) },
              { label: 'How to Update\u2026', click: () => showManualUpdateGuide() },
            ],
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
