'use strict';

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { fileURLToPath } = require('node:url');

const gamePath = path.resolve(__dirname, 'index.html');
let mainWindow = null;

function isGameFileUrl(destination) {
  try {
    const url = new URL(destination);
    if (url.protocol !== 'file:') return false;
    return path.resolve(fileURLToPath(url)) === gamePath;
  } catch {
    return false;
  }
}

function isDevToolsShortcut(input) {
  const key = String(input.key || '').toLowerCase();
  return key === 'f12' || (input.control && input.shift && key === 'i');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    minWidth: 640,
    minHeight: 360,
    backgroundColor: '#000000',
    show: false,
    title: 'Same Room',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: !app.isPackaged,
    },
  });

  mainWindow = win;
  win.removeMenu();
  win.once('ready-to-show', () => win.show());

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (event, destination) => {
    if (!isGameFileUrl(destination)) event.preventDefault();
  });
  win.webContents.session.setPermissionRequestHandler(
    (_webContents, _permission, callback) => callback(false),
  );
  win.webContents.session.setPermissionCheckHandler(() => false);

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;

    if (input.key === 'F11') {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
      return;
    }

    if (app.isPackaged && isDevToolsShortcut(input)) event.preventDefault();
  });

  win.on('closed', () => {
    if (mainWindow === win) mainWindow = null;
  });

  win.loadFile(gamePath);
}

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    ipcMain.handle('app:quit', () => {
      app.quit();
    });
    createWindow();
  });
}

app.on('window-all-closed', () => app.quit());
