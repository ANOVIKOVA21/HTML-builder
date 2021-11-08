const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const way = path.join(__dirname, 'text.txt')
const output = fs.createWriteStream(way);

stdout.write('Enter some text\n');
stdin.on('data', data => {
    const str = data.toString();
    if (str.trim() === 'exit') {
        stdout.write('Goodbye\n');
        process.exit();
    }
    output.write(str)
});
process.on('SIGINT', () => {
    console.log('\nGoodbye');
    process.exit();
})