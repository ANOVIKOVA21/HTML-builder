const fs = require('fs');
const path = require('path');
const wayToTemplate = path.join(__dirname, 'template.html')
const wayToComponents = path.join(__dirname, 'components')
const wayToAllStyles = path.join(__dirname, 'styles')
const wayToNewHtml = path.join(__dirname, 'project-dist/index.html')
const wayToNewCss = path.join(__dirname, 'project-dist/style.css')

function createDir() {
    const way = path.join(__dirname, 'project-dist')
    const src = path.join(__dirname, 'assets')
    const wayToAssets = path.join(__dirname, 'project-dist/assets')
    fs.promises.mkdir(way, { recursive: true }).then(function() {
        fs.promises.mkdir(wayToAssets, { recursive: true }).then(function() {
            copyDir(src, wayToAssets)
        });
    });
}
createDir()

function copyDir(src, way) {
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        let filesNames = [];
        files.forEach(file => {
            filesNames.push(file.name)
            if (file.isDirectory()) {
                fs.promises.mkdir(way + '/' + file.name, { recursive: true }).then(function() {
                    copyDir(src + '/' + file.name, way + '/' + file.name)
                })
            } else {
                fs.copyFile(src + '/' + file.name, way + '/' + file.name, (err) => {
                    if (err) throw err;
                })
            }
        });
        fs.readdir(way, (err, copies) => {
            if (err) throw err;
            copies.forEach(copy => {
                if (filesNames.indexOf(copy) === -1) {
                    fs.rm(way + '/' + copy, { recursive: true }, (err) => { if (err) throw err })
                }
            });
        });
    })
}

fs.readFile(wayToTemplate, 'utf8', (err, data) => {
    if (err) throw err;
    let templateStrs = data.match(/{{.+}}/g)
    let tags = []
    templateStrs.forEach(str => tags.push(str.match(/\w/g).join('')))
    fs.readdir(wayToComponents, (err, files) => {
        if (err) throw err;
        const htmlArr = files.filter(file => path.extname(wayToComponents + '/' + file) === '.html')
        htmlArr.forEach(file => {
            const fileName = file.slice(0, file.indexOf('.'))
            fs.readFile(wayToComponents + '/' + file, 'utf8', (err, component) => {
                if (err) throw err;
                const fileIndex = tags.indexOf(fileName)
                if (fileIndex !== -1) {
                    data = data.replace(templateStrs[fileIndex], component)
                    fs.open(wayToNewHtml, 'w', (err) => {
                        if (err) throw err;
                        fs.writeFile(wayToNewHtml, data, (err) => {
                            if (err) throw err;
                        });
                    });
                }
            });
        });
    });
});

fs.readdir(wayToAllStyles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    const fileArr = files.filter(file => file.isFile())
    const styleArr = fileArr.filter(file => path.extname(wayToAllStyles + '/' + file.name) === '.css')
    styleArr.forEach(file => {
        fs.open(wayToNewCss, 'w', (err) => {
            if (err) throw err;
            fs.readFile(wayToAllStyles + '/' + file.name, 'utf8', (err, data) => {
                if (err) throw err;
                fs.appendFile(wayToNewCss, data, (err) => {
                    if (err) throw err;
                });
            });
        });
    });
});