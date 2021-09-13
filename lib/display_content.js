"use strict";
exports.__esModule = true;
exports.render_parent_files = void 0;
var fs = require('fs');
function render_parent_directories() {
}
function render_parent_files(dir) {
    try {
        fs.readdirSync("" + dir).filter(function (files) {
            fs.stat(files, function (err, stats) {
                if (err)
                    throw err;
                if (stats.isFile()) {
                    var list_item = document.createElement('a');
                    list_item.innerHTML = "" + files;
                    list_item.className = "file_list_item";
                    global.document.appendChild(list_item);
                }
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
exports.render_parent_files = render_parent_files;
