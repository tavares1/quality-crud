const fs = require('fs');
const DB_FILE_PATH = './core/db'
console.log('[CRUD]')

create = (content) => {
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}

read = () => {
    return fs.readFileSync(DB_FILE_PATH, {encoding: 'utf-8', flag: 'r'})
}
console.log(create("Hoje eu preciso gravar aulas.\nTeste"))

console.log(read())