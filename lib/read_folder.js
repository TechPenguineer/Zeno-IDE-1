
const fs = require('fs')
 
const openFolder = async () => 
{
  document.getElementById('dirs').addEventListener('click', () => {
    window.postMessage({
      type: 'select-dirs'
    })
  })
}

const GetFolders = async (path) => {
    const FOLDERS=[]
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
      });

}

module.exports = {GetFolders, openFolder}
