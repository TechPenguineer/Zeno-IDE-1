function endsWith(str, suffix) {
    console.log(str.indexOf(suffix, str.length - suffix.length) !== -1);
    }
    
    var typewithoutDOT = "js"
    var type = `.${typewithoutDOT}`
    
    const fs = require('fs');
    var dir = './TestFolder';
    
    console.log(`Looking for ${type} File(s)`)
    fs.readdir(dir, (err, files) => {
     
        files.forEach((file) => {
            console.log("File:", file);
            endsWith(file,`${type}`)
        });
      
     
    });