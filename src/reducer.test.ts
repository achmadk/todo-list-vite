import { describe, expect, it } from 'vitest'
import { todoReducer } from './reducer'

describe('test reducer.ts file', () => {
  describe('NO_ACTION', () => {
    it('same as initial state', () => {
      const result = todoReducer({ todos: [], completedTodos: [] })
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(0)
    })
  })

  describe('SET_COMPLETED_TODOS', () => {
    it('has 1 completedTodos when payload is an array with 1 element', () => {
      const result = todoReducer(
        { todos: [], completedTodos: [] },
        { type: 'SET_COMPLETED_TODOS', payload: [1] }
      )
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(1)
    })

    it('has 3 completedTodos when payload is an array with 3 elements', () => {
      const result = todoReducer(
        { todos: [], completedTodos: [] },
        { type: 'SET_COMPLETED_TODOS', payload: [1, 2, 3] }
      )
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(3)
    })
  })

  describe('ADD_TODO', () => {
    it('has 1 todos when payload is an array with 1 element', () => {
      const result = todoReducer(
        { todos: [], completedTodos: [] },
        { type: 'ADD_TODO', payload: { id: 12, text: 'Hello world' } }
      )
      expect(result.todos.length).toBe(1)
      expect(result.todos[0].id).toBe(12)
      expect(result.todos[0].text).toBe('Hello world')
      expect(result.completedTodos.length).toBe(0)
    })
  })

  describe('UPDATE_TODO', () => {
    it('has 1 updated todos', () => {
      const result = todoReducer(
        { todos: [{ id: 12, text: 'Hello world' }], completedTodos: [] },
        { type: 'UPDATE_TODO', payload: { id: 12, text: 'Hello world 2' } }
      )
      expect(result.todos.length).toBe(1)
      expect(result.todos[0].id).toBe(12)
      expect(result.todos[0].text).toBe('Hello world 2')
      expect(result.completedTodos.length).toBe(0)
    })

    it('no updated todos', () => {
      const result = todoReducer(
        { todos: [{ id: 12, text: 'Hello world' }], completedTodos: [] },
        { type: 'UPDATE_TODO', payload: { id: 13, text: 'Hello world 2' } }
      )
      expect(result.todos.length).toBe(1)
      expect(result.todos[0].id).toBe(12)
      expect(result.todos[0].text).toBe('Hello world')
      expect(result.completedTodos.length).toBe(0)
    })
  })

  describe('DELETE_TODO', () => {
    it('successfully delete existing todos', () => {
      const result = todoReducer(
        { todos: [{ id: 12, text: 'Hello world' }], completedTodos: [] },
        { type: 'DELETE_TODO', payload: 12 }
      )
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(0)
    })
  })

  describe('TOGGLE_TODO', () => {
    it('successfully add existing completedTodos', () => {
      const result = todoReducer(
        { todos: [], completedTodos: [] },
        { type: 'TOGGLE_TODO', payload: 12 }
      )
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(1)
    })

    it('successfully remove existing completedTodos', () => {
      const result = todoReducer(
        { todos: [], completedTodos: [12] },
        { type: 'TOGGLE_TODO', payload: 12 }
      )
      expect(result.todos.length).toBe(0)
      expect(result.completedTodos.length).toBe(0)
    })
  })
})
