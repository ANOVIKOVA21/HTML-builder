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
            fs.readdir(way, (err, copies) => {
                if (err) throw err;
                copies.forEach(copy => {
                    if (files.indexOf(copy) === -1) {
                        fs.unlink(way + '/' + copy, (err) => { if (err) throw err })
                    }
                });
            });
        });
    });
}
copyDir()