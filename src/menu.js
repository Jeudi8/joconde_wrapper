const { app } = require('electron');
const getMainWindow = require('./mainWindow');

const template = [
  {
    label: 'Dev tools',
    role: 'window',
    submenu: [
      {
        label: `Wrapper v${app.getVersion()}`,
      },
      {
        label: 'Toggle fullscreen',
        role: 'togglefullscreen',
      },
      {
        label: 'Minimize window',
        role: 'minimize',
      },
      {
        label: 'Toggle Developer Tools',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        },
      },
      {
        label: 'Reload current page',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: 'Exit',
        role: 'close',
      },
    ],
  },
  {
    label: 'Device Settings',
    async click(item, focusedWindow) {
      getMainWindow().webContents.send('loadSettings');
    },
  },
  {
    label: 'Load App',
    async click(item, focusedWindow) {
      getMainWindow().webContents.send('loadApp');
    },
  },
];

module.exports = template;
