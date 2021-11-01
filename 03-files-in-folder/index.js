const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'secret-folder')
fs.readdir(way, { withFileTypes: true }, (err, files) => {
    if (err) throw err
    files.filter(file => file.isFile()).forEach(file => {
        let indexPoint = file.name.indexOf('.')
        const filename = file.name.slice(0, indexPoint)
        const ext = file.name.slice(indexPoint + 1)
        fs.stat(way + '/' + file.name, (err, stats) => {
            if (err) throw err
            const size = stats.size / 1024 + 'KB'
            console.log(`${filename} - ${ext} - ${size}`)
        })
    })
})