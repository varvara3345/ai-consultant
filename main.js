const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,  // отключаем изоляцию для простоты
      nodeIntegration: false    // выключаем node интеграцию, чтобы фронтенд был безопаснее
    }
  });

  win.loadFile(path.join(__dirname, 'frontend', 'index.html'));
}

app.whenReady().then(createWindow);

// Чтобы приложение корректно работало на macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
