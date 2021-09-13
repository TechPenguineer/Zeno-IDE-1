"use strict";
exports.__esModule = true;
var electron_2 = require("electron");
exports.__esModule = true;
var electron_1 = require("electron");
var app = electron_1.app, BrowserWindow = electron_1.BrowserWindow, Menu = electron_1.Menu, ipcMain = electron_1.ipcMain;
var path = require("path");
var fs = require('fs');
var contextMenu = require('electron-context-menu');
var dir;
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
    var options = electron_2.dialog.showOpenDialog({
        // See place holder 1 in above image
        title: "Zeno - Folder Selector",
        // See place holder 2 in above image
        defaultPath: "C:\\",
        // See place holder 3 in above image
        buttonLabel: "Open Folder in Zeno",
        // See place holder 4 in above image
        properties: ["openDirectory"]
    });
    function render_parent_files(dir) {
        try {
            fs.readdirSync(dir).filter(function files() {
                fs.stat(files, function (err, stats) {
                    if (err)
                        throw err;
                    if (stats.isFile(files)) {
                        mainWindow.webContents.executeJavaScript("var list_item = document.createElement('a'); list_item.innerHTML = '' + files; document.body.appendChild(list_item);");
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    function selectDirectory() {
        var flder;
        flder = electron_1.dialog.showOpenDialog(this, { properties: ["openDirectory"], defaultPath: "./", title: "Zeno - Open Folder", buttonLabel: "Open Folder In Zeno" }).then(function (data) {
            console.log(data.filePaths[0]);
            render_parent_files(data.filePaths.toString());
        });
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
