console.log("this is a test to see if the script reads this file only")
"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
const {app,BrowserWindow,Menu,ipcMain} = electron_1
var path = require("path");
var fs = require('fs');

// NONE OF THIS MATTERES