const { BrowserWindow } = require('electron');

module.exports = () => {
  const window = BrowserWindow.getAllWindows();
  return window[window.length - 1];
};
