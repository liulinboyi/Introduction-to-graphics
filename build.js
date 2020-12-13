const execa = require('execa')
const fs = require('fs');
const path = require('path')

void async function () {
    await execa(
        './node_modules/.bin/webpack', {
        stdio: 'inherit'
    }
    )

    const dirpath = path.join(__dirname, '/dist/')

    const apps = fs.readdirSync(path.resolve(__dirname, "apps"))
    let content = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    const menuStr = apps.map(app => `<li><a class='menu-item' data-link='${app}'>${app}</a></li>`).join('\n')
    content = content.replace("__MENU__", menuStr)
    fs.writeFileSync(`${path.join(__dirname, `/dist/index.html`)}`, content, {
        encoding: 'utf-8'
    })

    fs.readdir(dirpath, function (err, files) {
        console.log(files, 'files')
        const htmlFiles = files.filter(el => /\.html$/.test(el))
        htmlFiles.forEach(item => {
            let content = fs.readFileSync(path.join(dirpath, item), { encoding: 'utf-8' })
            content = content.replace(/__APP__\.js/g, "#")
            // console.log(content, 'content')
            fs.writeFileSync(`${path.join(__dirname, `/dist/${item}`)}`, content, {
                encoding: 'utf-8'
            })
        })
    })
}()
