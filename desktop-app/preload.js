// Предзагрузка для безопасного взаимодействия между процессами
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // Здесь можно добавить безопасные методы для взаимодействия с основным процессом
    sendMessage: (message) => ipcRenderer.send('message', message),
    onResponse: (callback) => ipcRenderer.on('response', callback)
}) 