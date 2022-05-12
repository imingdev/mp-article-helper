const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    minWidth: 1100,
    minHeight: 650,
    useContentSize: true,
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    backgroundColor: '#0000',
    webPreferences: {
      preload: require.resolve('./preload'),
    },
  });

  // 不显示菜单
  win.setMenu(null);
  // 已经加载成功后显示
  win.once('ready-to-show', () => win.show());

  if (process.env.NODE_ENV === 'development') {
    return win.loadURL('http://localhost:5001/');
  }
  return win.loadFile(require.resolve('../client/index.html'));
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
