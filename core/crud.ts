import fs from 'fs'
import {v4 as uuid} from 'uuid'
import { Todo } from './Todo'
const DB_FILE_PATH = './core/db'
console.log('[CRUD]')

function create (content: string) {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos: Todo[] = [...read(), todo]

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos
  }, null, 2))
  return todo;
}

function read(): Todo[] {
  const dbString = fs.readFileSync(DB_FILE_PATH, {encoding: 'utf-8', flag: 'r'})
  const db = JSON.parse(dbString || "{}")
  if (!db.todos) return []
  return db.todos
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  console.log(partialTodo.content)
  const todos = read()
  todos.forEach((currentTodo) => { 
    const isToUpdated = currentTodo.id === id
    if (isToUpdated) {
      updatedTodo = Object.assign(currentTodo, partialTodo)
    }
  })
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos
  }, null, 2))
  
  if (!updatedTodo) {
    throw new Error("Provide an available ID")
  }

  return updatedTodo
}

function updateContentById(id: string, content: string) {
  return update(id, {
    content: content
  })
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "")
}

CLEAR_DB()
create("Hoje eu preciso gravar aulas.\nTeste")
create("Hoje eu preciso gravar mais aulas.\nTeste")
const thirdTodo = create('Terceira atividade!')
console.log(updateContentById(thirdTodo.id, "Comprar açai com a Amandinha"))
// console.log(read())
