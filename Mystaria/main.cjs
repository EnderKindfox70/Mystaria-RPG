const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow () 
{
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'public/favicon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // En DEV, charge Vite (localhost:5173). En PROD, charge le build dist/index.html
  const isDev = !app.isPackaged;
    if (isDev) 
    {
        win.loadURL('http://localhost:8080');
    } else 
    {
      win.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
