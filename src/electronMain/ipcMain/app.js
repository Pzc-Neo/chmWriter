import { ipcMain } from 'electron'

export const registerAppEvent = function (app, win) {
  ipcMain.on('app:close', function (event) {
    app.exit()
    event.returnValue = 'succese'
  })

  ipcMain.on('app:minimize', function (event) {
    win.minimize()
    event.returnValue = 'minimize'
  })
  ipcMain.on('app:maximize', function (event) {
    if (win.isMaximized()) {
      win.unmaximize()
      event.returnValue = 'unmaximize'
    } else {
      win.maximize()
      event.returnValue = 'maximize'
    }
  })
}
