
const fs = require('fs')
const openFolder = async () => 
{
  document.getElementById('dirs').addEventListener('click', () => {
    window.postMessage({
      type: 'select-dirs'
    })
  })
}



const GetFolders = async (inputFolder) => {    
  fs.readdirSync(inputFolder).forEach(function (dirContent) {
    dirContent = path.resolve(inputFolder, dirContent);
    if (getSubFolders && fs.statSync(dirContent).isDirectory()) {
      results = results.concat(helpers.findLUFiles(dirContent, getSubFolders, extType));
    }
    if (fs.statSync(dirContent).isFile()) {
      if (dirContent.endsWith(extType)) {
        results.push(dirContent);
      }
    }
  });

}

console.log(GetFolders("./"))

module.exports = {GetFolders, openFolder}
