import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";

function createWindow() {

  var menu = Menu.buildFromTemplate(
    [
      
        
      {
        label: "File",
        
        submenu: [
            { label: 'New File', submenu: [
                    { label: "Javascript", submenu: [
                      {
                        label: "Node.JS File"
                      },
                      {
                        label: "Web-based file"
                      }
                    ] },
                    { label: "Web Types", submenu: [
                            { label: "EJS" },
                            { label: "HTML" }
                        ] },
                    { label: "Dunamis", submenu: [
                        {label: "Blank File"},
                        {label: "Function Template"}
                    ] },
                    { label: "Python", submenu:[
                        {label: "Empty Class"},
                        {label: "Empty Project"},
                        {label: "Empty File"}
                    ] },
                    { label: "Julia", submenu:[
                        {
                            label: "Empty File"
                        },
                        {
                            label: "Template File"
                        },
                        {
                            label: "Template Project"
                        }
                    ] },
                    { label: "Java", submenu: [
                        {
                            label: "Library Templates", submenu: [
                                {
                                    label: "JFrame"
                                }
                            ]
                        },
                        {
                            label: "Empty Class"
                        }
                    ] },
                    { label: "C#", submenu: [
                      {
                        label: "Empty File"
                      },
                      {
                        label: "Empty Class"
                      }
                    ] },
                    { label: "C++", submenu:[
                      {
                        label: "Empty File"
                      },
                      {
                        label: "Empty Class"
                      }
                    ] }
                ]
              
            },
            {
              label: "Generate", submenu:[
                {
                  label: "Makefile", submenu:[
                    { label: "gcc" },
                    { label: "g++" }
                  ]  
                },
                {
                  label: "Zeno Folder"
                }
            ]
            }
             
        ]
        
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
      ]}])

    Menu.setApplicationMenu(menu);

  const mainWindow = new BrowserWindow({
    height: 600,
    title: "Zeno",
    
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
