const { ipcMain, BrowserWindow } = require('electron');
const fs = require('fs-extra');
const { join } = require('path');
const getMainWindow = require('./mainWindow');
const wrapperCache = require('./wrapperCache');
const express = require('express');
const port = 3000;

express()
  .use(express.static(wrapperCache))
  .listen(port, () => {
    console.log(`Server run on port ${port}`);
  });

const loadSettings = () => {
  const view = join(__dirname, 'index.html');
  const window = getMainWindow();
  window.loadFile(view);
};

const loadApp = () => {
  const appFile = join(wrapperCache, `index.html`);
  if (!fs.existsSync(appFile)) return loadSettings();

  const view = `http://localhost:${port}/index.html`;
  const window = getMainWindow();
  window.loadURL(view);
};

module.exports.init = () => {
  ipcMain.on('ipcLoadApp', loadApp);
  ipcMain.on('ipcLoadSettings', loadSettings);

  loadApp();
};
