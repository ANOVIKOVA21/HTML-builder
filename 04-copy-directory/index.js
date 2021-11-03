const fs = require('fs');
const path = require('path');

function copyDir() {
    const way = path.join(__dirname, 'files-copy')
    const src = path.join(__dirname, 'files')
    fs.promises.mkdir(way, { recursive: true }).then(function() {
        fs.readdir(src, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                fs.copyFile(src + '/' + file, way + '/' + file, (err) => {
                    if (err) throw err;
                })
            });
        });
        console.log('Directory created successfully');
    })
}
copyDir()