const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const menu = require('./menu');
const unzip = require('./unzip');
const loadView = require('./loadView');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  const mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    maximizable: true,
    title: `Wrapper v${app.getVersion()}`,
    closable: true,
    minimizable: isDev ? true : false,
    fullscreen: isDev ? false : true,
    autoHideMenuBar: isDev ? false : true,
    icon: path.join(app.getAppPath(), 'src', 'icon.ico'),
    backgroundColor: '#222222',
    rotation: 180,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      allowRunningInsecureContent: false,
      allowRendererProcessReuse: false,
      preload: path.join(app.getAppPath(), 'src', 'preload.js'),
    },
  });

  if (!isDev) mainWindow.maximize();

  mainWindow.webContents.once('did-frame-finish-load', () => {
    if (isDev) mainWindow.webContents.openDevTools();

    unzip.init();
    loadView.init();
    mainWindow.webContents.send(
      'log',
      `${isDev ? 'development' : 'production'} ${process.platform} platform`
    );
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
