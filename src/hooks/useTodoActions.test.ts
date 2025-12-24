// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import type { Todo } from '@/type'
import { disposableRenderHook } from '@/utils'
import useTodoActions from './useTodoActions'

describe('test useTodoActions hooks', () => {
  describe('successfully call handleAddTodo', () => {
    it('with usual text', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const spyHandleAddTodo = vi.spyOn(
        renderHookResult.result.current,
        'handleAddTodo'
      )
      await renderHookResult.result.current.handleAddTodo('hello react devs!')
      expect(spyHandleAddTodo).toHaveBeenCalledOnce()
      expect(renderHookResult.result.current.todos?.length).toBe(1)
    })

    it('with empty text', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const spyHandleAddTodo = vi.spyOn(
        renderHookResult.result.current,
        'handleAddTodo'
      )
      await renderHookResult.result.current.handleAddTodo('')
      expect(spyHandleAddTodo).toHaveBeenCalledOnce()
      expect(renderHookResult.result.current.todos?.length).toBe(1)
    })

    it('with duplicated text', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const spyHandleAddTodo = vi.spyOn(
        renderHookResult.result.current,
        'handleAddTodo'
      )
      await renderHookResult.result.current.handleAddTodo('hello react devs!')
      expect(spyHandleAddTodo).toHaveBeenCalledOnce()
      expect(renderHookResult.result.current.todos?.length).toBe(1)
    })
  })

  describe('successfully call handleToggleClick', () => {
    it('with existed id', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const { result, rerender } = renderHookResult
      const spyHandleAddTodo = vi.spyOn(result.current, 'handleToggleClick')
      await result.current.handleAddTodo('hello react devs!')
      rerender()
      const todoId = result.current.todos?.[0].id ?? 0
      result.current.handleToggleClick(todoId)
      expect(spyHandleAddTodo).toHaveBeenCalledOnce()
      rerender()
      expect(result.current.todos?.[0].completed).toBe(true)
    })

    it('with existed id, then toggle it again', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const { result, rerender } = renderHookResult
      await result.current.handleAddTodo('hello react devs!')
      rerender()
      const todoId = result.current.todos?.[0].id ?? 0
      result.current.handleToggleClick(todoId)
      rerender()
      result.current.handleToggleClick(todoId)
      rerender()
      expect(result.current.todos?.[0].completed).toBe(false)
    })

    it('with non exist id', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const { result, rerender } = renderHookResult
      await result.current.handleAddTodo('hello react devs!!')
      rerender()
      result.current.handleToggleClick(12)
      expect(result.current.todos?.length).toBe(2)
    })
  })

  describe('successfully call handleEditClick', () => {
    it('with existed id', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const spyHandleEditClick = vi.spyOn(
        renderHookResult.result.current,
        'handleEditClick'
      )
      await renderHookResult.result.current.handleAddTodo('hello react devs!')
      renderHookResult.rerender()
      let todo = renderHookResult.result.current.todos?.[0]
      renderHookResult.result.current.handleEditClick(todo)
      expect(spyHandleEditClick).toHaveBeenCalledOnce()
      renderHookResult.rerender()
      expect(renderHookResult.result.current.todos?.[0].completed).toBe(false)

      renderHookResult.result.current.handleEditClick({
        ...todo,
        text: '   '
      } as Todo)
      renderHookResult.rerender()

      todo = renderHookResult.result.current.todos?.[0]
      renderHookResult.result.current.handleEditClick(todo)
      renderHookResult.rerender()
    })
  })

  describe('successfully call handleDeleteClick', () => {
    it('with existed id', async () => {
      using renderHookResult = disposableRenderHook(() => useTodoActions())
      const spyHandleDeleteClick = vi.spyOn(
        renderHookResult.result.current,
        'handleDeleteClick'
      )
      const todo = renderHookResult.result.current.todos?.[0]
      if (todo) {
        renderHookResult.result.current.handleDeleteClick(todo.id)
      }
      expect(spyHandleDeleteClick).toHaveBeenCalledOnce()
      renderHookResult.rerender()
      expect(renderHookResult.result.current.todos?.length).toBe(1)
    })
  })
})
