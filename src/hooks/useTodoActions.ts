import { useCallback, useEffect, useMemo, useReducer } from 'react'
import useSWR from 'swr'
import {
  addTodo,
  deleteTodo,
  getCompletedTodos,
  getTodos,
  saveCompletedTodos,
  updateTodo
} from '../api'
import { showErrorToast, showSuccessToast } from '../components/Toast'
import { todoReducer } from '../reducer'
import type { Action, Todo } from '../type'

const useTodoActions = <D extends Todo = Todo>() => {
  const {
    data: todos,
    error,
    mutate
  } = useSWR<D[]>('/api/todos', getTodos, { refreshInterval: 1000 })

  const [state, initialDispatch] = useReducer(todoReducer, {
    todos: [],
    completedTodos: []
  })
  const dispatch = initialDispatch as (action?: Action | null) => void

  useEffect(() => {
    /* v8 ignore next 3 */
    if (error) {
      showErrorToast(error.message)
    }
  }, [error])

  const fetchCompletedTodos = async () => {
    let completedTodos: number[] = []
    try {
      completedTodos = await getCompletedTodos<D>()
      dispatch({ type: 'SET_COMPLETED_TODOS', payload: completedTodos })
      /* v8 ignore next 3 */
    } catch {
      showErrorToast('Unable to load completed todos.')
    }
  }
  const handleAddTodo = useCallback(
    async (text: string) => {
      const trimmedText = text.trim()
      if (!trimmedText) {
        showErrorToast('Todo text cannot be empty.')
        return
      }

      if (todos?.some(todo => todo.text === trimmedText)) {
        showErrorToast('Todo text already exists.')
        return
      }

      const newTodo: D = {
        id: Date.now(),
        text: trimmedText,
        completed: false
      } as D

      try {
        await mutate(
          async (prevTodos = []) => {
            await addTodo<D>(newTodo)
            return [...prevTodos, newTodo]
          },
          {
            optimisticData: todos => [...(todos ?? []), newTodo],
            rollbackOnError: true,
            revalidate: false
          }
        )

        dispatch({ type: 'ADD_TODO', payload: newTodo })
        showSuccessToast('Todo added successfully.')
        /* v8 ignore next 3 */
      } catch {
        showErrorToast('Failed to add the todo.')
      }
    },
    [todos, mutate, dispatch]
  )

  const handleToggleTodo = useCallback(
    async (todoId: number) => {
      const todo = todos?.find(todo => todo.id === todoId)
      if (!todo) return

      const isCompleted = state.completedTodos.includes(todoId)
      const updatedCompletedTodos = isCompleted
        ? state.completedTodos.filter(id => id !== todoId)
        : [...state.completedTodos, todoId]

      try {
        dispatch({ type: 'TOGGLE_TODO', payload: todoId })
        dispatch({
          type: 'SET_COMPLETED_TODOS',
          payload: updatedCompletedTodos
        })

        await mutate(
          async (prevTodos = []) => {
            await updateTodo({ ...todo, completed: !isCompleted })
            return prevTodos.map(item =>
              /* v8 ignore next */
              item.id === todoId ? { ...item, completed: !isCompleted } : item
            )
          },
          {
            optimisticData: todos?.map(item =>
              /* v8 ignore next */
              item.id === todoId ? { ...item, completed: !isCompleted } : item
            ),
            rollbackOnError: true,
            revalidate: false
          }
        )

        showSuccessToast(
          isCompleted
            ? 'Todo marked as incomplete.'
            : 'Todo marked as complete.'
        )
        await saveCompletedTodos(updatedCompletedTodos)
        /* v8 ignore next 5 */
      } catch {
        showErrorToast('Failed to change todo completion status.')
        dispatch({ type: 'TOGGLE_TODO', payload: todoId })
        dispatch({ type: 'SET_COMPLETED_TODOS', payload: state.completedTodos })
      }
    },
    [todos, state.completedTodos, dispatch, mutate]
  )

  const handleUpdateTodo = useCallback(
    async (todoId: number, newText: string) => {
      const trimmedText = newText.trim()
      if (trimmedText.length === 0) {
        showErrorToast('Todo text cannot be empty.')
        return
      }

      if (todos?.some(todo => todo.text === trimmedText)) {
        showErrorToast('Todo text already exists.')
        return
        /* v8 ignore next 29 */
      }

      const todoItem = todos?.find(item => item.id === todoId)
      if (todoItem) {
        const updatedTodo = { ...todoItem, text: trimmedText }

        try {
          await mutate(
            async (prevTodos = []) => {
              await updateTodo(updatedTodo)
              return prevTodos.map(item =>
                item.id === todoId ? updatedTodo : item
              )
            },
            {
              optimisticData: todos?.map(item =>
                item.id === todoId ? updatedTodo : item
              ),
              rollbackOnError: true,
              revalidate: false
            }
          )

          dispatch({ type: 'UPDATE_TODO', payload: updatedTodo })
          showSuccessToast('Todo updated successfully.')
        } catch {
          showErrorToast('Failed to update the todo.')
        }
      }
    },
    [todos, mutate, dispatch]
  )

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      try {
        await mutate(
          async (prevTodos = []) => {
            /* v8 ignore next 3 */
            await deleteTodo(todoId)
            return prevTodos.filter(todo => todo.id !== todoId)
          },
          {
            optimisticData: todos?.filter(todo => todo.id !== todoId),
            rollbackOnError: true,
            revalidate: false
            /* v8 ignore next 8 */
          }
        )

        dispatch({ type: 'DELETE_TODO', payload: todoId })
        showSuccessToast('Todo deleted successfully.')
      } catch {
        showErrorToast('Failed to delete the todo.')
      }
    },
    [mutate, todos, dispatch]
  )

  const handleEditClick = useCallback(
    (todo?: Todo) => {
      if (todo) {
        handleUpdateTodo(todo.id, todo.text)
      }
    },
    [handleUpdateTodo]
  )

  const handleDeleteClick = useCallback(
    (id: number) => {
      handleDeleteTodo(id)
    },
    [handleDeleteTodo]
  )

  const handleToggleClick = useCallback(
    (id: number) => {
      handleToggleTodo(id)
    },
    [handleToggleTodo]
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: `componentDidMount` implementation of `useEffect` hooks.
  useEffect(() => {
    fetchCompletedTodos()
  }, [])

  return useMemo(
    () => ({
      todos,
      error,
      completedTodos: state.completedTodos,
      handleAddTodo,
      handleEditClick,
      handleDeleteClick,
      handleToggleClick
    }),
    [
      todos,
      error,
      state.completedTodos,
      handleAddTodo,
      handleEditClick,
      handleDeleteClick,
      handleToggleClick
    ]
  )
}

export default useTodoActions
