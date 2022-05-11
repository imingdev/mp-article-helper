import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  return win.loadFile('index.html');
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        return createWindow();
      }
    });
  });
