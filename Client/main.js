const { app, BrowserWindow } = require('electron')
const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)


function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
    
    console.log(win)
}

app.on('ready', createWindow)


connection.onopen = () => {
    connection.send('Message From Client') 
}
   
connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
    console.log(e.data)
    BrowserWindow.getFocusedWindow().webContents
    document.getElementById('lbResultado').innerHTML = e.data;
}