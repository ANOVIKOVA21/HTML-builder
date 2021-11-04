const fs = require('fs');
const path = require('path');
const wayToNewFile = path.join(__dirname, 'project-dist/bundle.css')
const wayToAllStyles = path.join(__dirname, 'styles')

fs.readdir(wayToAllStyles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    const fileArr = files.filter(file => file.isFile())
    const styleArr = fileArr.filter(file => path.extname(wayToAllStyles + '/' + file.name) === '.css')
    styleArr.forEach(file => {
        fs.open(wayToNewFile, 'w', (err) => {
            if (err) throw err;
            fs.readFile(wayToAllStyles + '/' + file.name, 'utf8', (err, data) => {
                if (err) throw err;
                fs.appendFile(wayToNewFile, data, (err) => {
                    if (err) throw err;
                });
            })
        });
    })
})