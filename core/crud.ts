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

function deleteById(id: string) {
  const todos = read()
  const newTodos = todos.filter((todo) => {
    if (todo.id === id) {
      return false
    }
    return true
  })  

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos: newTodos
  }, null, 2))
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "")
}

CLEAR_DB()

let todo: Todo;

setTimeout(() => {
  todo = create("Hoje eu preciso gravar aulas.\nTeste")
},1000)

setTimeout(() => {
  todo = create("Hoje eu preciso gravar mais aulas.\nTeste")
},2000)

setTimeout(() => {
  todo = create("Hoje eu preciso gravar mais e mais aulas.\nTeste")
},3000)

setTimeout(() => {
  const thirdTodo = create('Terceira atividade!')
  todo = updateContentById(thirdTodo.id, "Comprar açai com a Amandinha")
},4000)

setTimeout(() => {
  deleteById(todo.id);
}, 5000);

setTimeout(() => {
  console.log(read())
}, 6000);
