"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        icon: "./icons/logo.png"
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
    function selectDirectory() {
        return __awaiter(this, void 0, void 0, function () {
            var filePaths;
            return __generator(this, function (_a) {
                filePaths = electron_2.dialog.showOpenDialog(mainWindow, { properties: ["openDirectory"], defaultPath: "./", title: "Zeno - Open Folder", buttonLabel: "Open Folder In Zeno" });
                return [2 /*return*/];
            });
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
