// your client side code here

const { ipcRenderer } = require('electron');

ipcRenderer.on('log', (_, ...rest) => console.log(...rest));
ipcRenderer.on('loadApp', () => ipcRenderer.send('ipcLoadApp'));
ipcRenderer.on('loadSettings', () => ipcRenderer.send('ipcLoadSettings'));
