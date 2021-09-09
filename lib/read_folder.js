
const path = require('path');
const fs = require('fs')

var srcpath2 = path.join('.', 'diapo', result);
function getDirectories(srcpath2) {
                return fs.readdirSync(srcpath2).filter(function (file) {
                    return fs.statSync(path.join(srcpath2, file)).isDirectory();
                });
            }

get('./')