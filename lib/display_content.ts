const fs = require('fs')
function render_parent_directories()
{

}
export function render_parent_files(dir)
{
    try
    {
     fs.readdirSync(`${dir}`).filter(files => {
            fs.stat(files, (err,stats)=>{
                if (err) throw err;

                if(stats.isFile())
                {
                    let list_item = document.createElement('a');
                    list_item.innerHTML = `${files}`;
                    list_item.className = "file_list_item";
                    document.appendChild(list_item)
                }
            })

        })

    }
    catch(e)
    {
        console.log(e);
    }
}

module.exports = { render_parent_directories }