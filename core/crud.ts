import fs from 'fs'
const DB_FILE_PATH = './core/db'
console.log('[CRUD]')

function create (content: string) {
  fs.writeFileSync(DB_FILE_PATH, content)
  return content;
}

function read() {
    return fs.readFileSync(DB_FILE_PATH, {encoding: 'utf-8', flag: 'r'})
}
console.log(create("Hoje eu preciso gravar aulas.\nTeste"))

console.log(read())
