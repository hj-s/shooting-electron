const { app } = require('electron')
const {BrowserWindow} = require('electron')
const { Menu } = require('electron')
const { MenuItem } = require('electron')
const { ipcMain } = require('electron')
const menu = new Menu()


function createWindow () {
	let win = new BrowserWindow({ width: 800, height: 600+24 , frame: false })
	win.loadFile('index.html')

	menu.append(new MenuItem({ 
		label: 'Restart',
		click: () => {
			win.webContents.executeJavaScript('Global.initglobal();')
		}
	}))
	menu.append(new MenuItem({ type: 'separator' }))
	menu.append(new MenuItem({ 
		label: 'Exit',
		click: () =>{
			app.quit()
		}
	}))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit();
});
app.on('before-quit', () => {
	mainWindow.removeAllListeners('close');
	mainWindow.close();
});

ipcMain.on('show-context-menu', (event) => {
	const win = BrowserWindow.fromWebContents(event.sender)
	menu.popup(win)
})