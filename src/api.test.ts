import { describe, expect, it } from 'vitest'
import {
  addTodo,
  deleteTodo,
  getTodos,
  saveCompletedTodos,
  updateTodo
} from './api'

describe('test api.ts file', () => {
  describe('test getTodos method', () => {
    it('has 0 todos', async () => {
      const todos = await getTodos()
      expect(todos.length).toBe(0)
    })
  })

  describe('test addTodo method', () => {
    it('successfully add 1 item', async () => {
      await addTodo({ id: 1, text: 'sample' })
      const todos = await getTodos()
      expect(todos.length).toBe(1)
    })
  })

  describe('test updateTodo method', () => {
    it('successfully update 1 item', async () => {
      await updateTodo({ id: 1, text: 'sample 2' })
      const todos = await getTodos()
      expect(todos.length).toBe(1)
    })
  })

  describe('test saveCompletedTodos method', () => {
    it('successfully save completed 1 item', async () => {
      await saveCompletedTodos([1])
      const todos = await getTodos()
      expect(todos.every(item => item.completed)).toBe(true)
    })
  })

  describe('test deleteTodo method', () => {
    it('successfully delete 1 item', async () => {
      await deleteTodo(1)
      const todos = await getTodos()
      expect(todos.length).toBe(0)
    })
  })
})
