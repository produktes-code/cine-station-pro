const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess = null;

function startBackend() {
    const isPackaged = app.isPackaged;
    const baseDir = isPackaged ? process.resourcesPath : __dirname;
    
    const pythonDir = process.platform === 'win32' ? 'standalone-python-windows' : 'standalone-python';
    const binDirName = process.platform === 'win32' ? 'Scripts' : 'bin';
    const uvicornCmd = process.platform === 'win32' ? 'uvicorn.exe' : 'uvicorn';
    
    const uvicornPath = path.join(baseDir, 'backend', pythonDir, binDirName, uvicornCmd);
    const ffmpegBinDir = path.join(baseDir, 'backend', 'bin');
    const cwd = path.join(baseDir, 'backend');

    // Prepend local ffmpeg bin directory to PATH
    const envPath = process.env.PATH || '';
    const newPath = `${ffmpegBinDir}:${envPath}`;

    console.log(`Starting FastAPI backend from: ${uvicornPath} with cwd: ${cwd}`);
    console.log(`FFmpeg bin dir: ${ffmpegBinDir}`);
    
    backendProcess = spawn(uvicornPath, ['app.main:app', '--host', '127.0.0.1', '--port', '8000'], {
        cwd: cwd,
        env: { ...process.env, PATH: newPath }
    });

    backendProcess.stdout.on('data', (data) => {
        console.log(`[FastAPI stdout]: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
        console.error(`[FastAPI stderr]: ${data}`);
    });

    backendProcess.on('close', (code) => {
        console.log(`FastAPI process exited with code ${code}`);
    });

    backendProcess.on('error', (err) => {
        console.error(`[FastAPI spawn error]: ${err.message}`);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        backgroundColor: '#111111', // CineStation Pro bg color
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        title: 'CineStation Pro 1.0',
    });

    const startUrl = process.env.DEV_SERVER_URL || `file://${path.join(__dirname, 'dist', 'index.html')}`;
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    startBackend();
    createWindow();
});

app.on('will-quit', () => {
    if (backendProcess) {
        console.log('Terminating FastAPI backend...');
        backendProcess.kill();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
