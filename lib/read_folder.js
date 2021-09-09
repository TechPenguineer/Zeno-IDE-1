
const fs = require('fs')

const GetFolders = async (path) => {
    const FOLDERS=[]
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
        
      });

}

read("./")
