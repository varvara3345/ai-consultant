const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Загружаем index.html из frontend директории
    win.loadFile(path.join(__dirname, '..', 'frontend', 'index.html'));

    // Открываем DevTools в режиме разработки
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

// Закрываем приложение когда все окна закрыты
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

// Обработка IPC сообщений
ipcMain.on('message', (event, message) => {
    // Здесь можно добавить обработку сообщений от рендерера
    console.log('Received message:', message);
}); 