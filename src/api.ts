import { createStore, get, update } from 'idb-keyval'
import type { Todo } from './type'

const store = createStore('todoListDB', 'todos')

export const getTodos = async <D extends Todo = Todo>() =>
  (await get<D[]>('todos', store)) ?? []

export const addTodo = async <D extends Todo = Todo>(todo: D) =>
  await update<D[]>('todos', prevVal => [...(prevVal ?? []), todo], store)

export const updateTodo = async <D extends Todo = Todo>(updatedTodo: D) =>
  await update<D[]>(
    'todos',
    prevVal => {
      /* v8 ignore next */
      const val = prevVal ?? []
      const selectedId = val.findIndex(v => v.id === updatedTodo.id)
      if (selectedId !== -1) {
        val[selectedId] = updatedTodo
      }
      return val
    },
    store
  )

export const deleteTodo = async <D extends Todo = Todo>(todoId: D['id']) =>
  /* v8 ignore next 4 */
  await update<D[]>(
    'todos',
    prevVal =>
      (prevVal ?? []).filter(v => {
        return v.id !== todoId
      }),
    store
  )

export const getCompletedTodos = async <D extends Todo = Todo>() => {
  const todos = await getTodos<D>()
  return todos.filter(todo => todo.completed).map(todo => todo.id)
}

export const saveCompletedTodos = async <D extends Todo = Todo>(
  completedTodos: number[]
) =>
  await update<D[]>(
    'todos',
    prevVal => {
      /* v8 ignore next */
      const val = prevVal ?? []
      return val.map(v => ({ ...v, completed: completedTodos.includes(v.id) }))
    },
    store
  )

export default {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
  saveCompletedTodos
}
