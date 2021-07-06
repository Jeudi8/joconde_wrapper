const { app, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const StreamZip = require('node-stream-zip');
const wrapperCache = require('./wrapperCache');

const unzip = async ({ from, to }) => {
  if (!to || !from) throw new Error('Provide right file path');

  try {
    const zip = new StreamZip.async({
      file: from,
    });
    await zip.extract(null, to);
    await zip.close();
    return `Unzip "${from}" to "${to}"`;
  } catch (err) {
    throw err;
  }
};

module.exports.init = () => {
  ipcMain.on('ipcZip', async (e, zipPath) => {
    if (!zipPath || typeof zipPath !== 'string') {
      e.reply('zipRes', false);
    }

    await fs.ensureDir(wrapperCache);
    await fs.emptyDir(wrapperCache);
    const res = await unzip({ from: zipPath, to: wrapperCache });
    e.reply('zipRes', true);
  });
};
