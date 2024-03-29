"use strict";

import { dialog, ipcRenderer } from "electron";

exports.__esModule = true;
var electron_1 = require("electron");
var app = electron_1.app, BrowserWindow = electron_1.BrowserWindow, Menu = electron_1.Menu, ipcMain = electron_1.ipcMain;
var path = require("path");
var fs = require('fs');
var contextMenu = require('electron-context-menu');
    let dir;



function createWindow() {
    // Tabs

    var mainWindow = new electron_1.BrowserWindow({
        show: false,
        title: "Zeno",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false
            
        },
        icon: "./icons/larger_icon.png"
    });

    let options = dialog.showOpenDialog({
        // See place holder 1 in above image
        title : "Zeno - Folder Selector", 
        
        // See place holder 2 in above image
        defaultPath : "C:\\",
        
        // See place holder 3 in above image
        buttonLabel : "Open Folder in Zeno",
        
        // See place holder 4 in above image
        properties: ["openDirectory"]
        
       })
       function render_parent_files( dir ) {
       
    }
    function selectDirectory() {
             

                // READS AND ADDS FILES TO TREE
        let flder;
        flder = electron_1.dialog.showOpenDialog(this, { properties: ["openDirectory"], defaultPath: "./", title: "Zeno - Open Folder", buttonLabel: "Open Folder In Zeno" }).then(data => {
            console.log(data.filePaths.toString());
               // REMOVES EXISTING FILES FROM TREE
               mainWindow.webContents.executeJavaScript("var paras = document.getElementsByClassName('file_tree_item'); while(paras[0]){ paras[0].parentNode.removeChild(paras[0])}");
            try {
                fs.readdir(data.filePaths[0].toString(),(err, files)=>{
                    files.forEach(file => {
                        console.log(file)
                        fs.stat(data.filePaths[0].toString()+"\\"+file, function (err, stats) {
                            if (err)
                                throw err;

                            // GETS FILES
                            if (stats.isFile()) {
                                let extention = path.extname(file);
                                console.log(extention);
                                mainWindow.webContents.executeJavaScript(`var div_item = document.getElementById("file_explorer"); var list_item = document.createElement('a'); var img_icon = document.createElement('img'); img_icon.src = "../icons/languages/file.png"; list_item.classList.add("file_tree_item"); list_item.innerHTML = \`${file}\`; div_item.appendChild(list_item);`);
                            }
                            else 

                            // GETS DIRECTORIES
                            if (stats.isDirectory()) {
                                 mainWindow.webContents.executeJavaScript("var div_item = document.getElementById('file_explorer'); var list_item = document.createElement('a'); var img_icon = document.createElement('img'); img_icon.src = '../icons/languages/file.png'; list_item.classList.add('file_tree_item'); list_item.innerHTML = `\&#8627;" + file +`; div_item.appendChild(list_item);`);
                                }
                        
                        });
                    });
            
                });
            }
            catch (e) {
                console.log(e);
            }
        })
    }
    var menu = electron_1.Menu.buildFromTemplate([
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
                                { label: "Blank File" },
                                { label: "Function Template" }
                            ] },
                        { label: "Python", submenu: [
                                { label: "Empty Class" },
                                { label: "Empty Project" },
                                { label: "Empty File" }
                            ] },
                        { label: "Julia", submenu: [
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
                        { label: "C++", submenu: [
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
                    label: "Generate", submenu: [
                        {
                            label: "Makefile", submenu: [
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
            label: "Open Folder",
            click: selectDirectory

        },
        {
            label: 'Edit',
            submenu: [
                { label: "Open", click: function () {
                        var baseDir = path.join(__dirname, '/../fileoutput/');
                        fs.readFile(baseDir + "testscripts.js", 'utf8', function (err, data) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(data);
                        });
                    } },
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
            ]
        }
    ]);
    electron_1.Menu.setApplicationMenu(menu);

    
    mainWindow.maximize();
    mainWindow.show();
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
