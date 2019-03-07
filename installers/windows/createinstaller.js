const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
	.then(createWindowsInstaller)
	.catch((error) => {
	console.error(error.message || error)
	process.exit(1)
})

function getInstallerConfig () {
	console.log('creating windows installer')
	const rootPath = path.join('./')
	const outPath = path.join(rootPath, 'release-builds')

	return Promise.resolve({
		appDirectory: path.join(outPath, 'Template-win32-x64'),
		authors: 'Maksim Morozov',
		noMsi: true,
		outputDirectory: path.join(rootPath, 'windows-installer'),
		exe: 'Template.exe',
		setupExe: 'TemplateSetup.exe'
	})
}