import cn from 'clsx'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import type { Todo, TodoListProps } from '../type'
import TodoItem from './TodoItem'

const TodoList: FC<TodoListProps> = ({
  todos = [],
  error,
  completedTodos,
  handleEditClick,
  handleDeleteClick,
  handleToggleClick
}) => {
  const sortedTodos = useMemo(
    /* v8 ignore next */
    () => [...todos].sort((a, b) => a.id - b.id),
    [todos]
  )
  const handleOnToggle = useCallback(
    (id: number) => () => {
      handleToggleClick(id)
    },
    [handleToggleClick]
  )
  const handleOnEdit = useCallback(
    (todo: Todo) => {
      handleEditClick(todo)
    },
    [handleEditClick]
  )
  const handleOnDelete = useCallback(
    (id: number) => () => {
      handleDeleteClick(id)
    },
    [handleDeleteClick]
  )

  const todoList = useMemo(
    () =>
      sortedTodos.map(todo => {
        const isTodoCompleted = completedTodos.includes(todo.id)

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isCompleted={isTodoCompleted}
            onToggle={handleOnToggle(todo.id)}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete(todo.id)}
          />
        )
      }),
    [sortedTodos, completedTodos, handleOnEdit, handleOnDelete, handleOnToggle]
  )

  return (
    <div
      data-testid="todo-list"
      className={cn('overflow-auto h-full', {
        'max-h-[300px]': todos.length > 4
      })}
    >
      {error ? (
        <div className="text-center text-gray-500 py-4">
          No todos available. Please try again later!
        </div>
      ) : todoList.length > 0 ? (
        todoList
      ) : (
        <div className="text-center text-gray-500 py-4">
          No todos available. Add a new task!
        </div>
      )}
    </div>
  )
}

export default TodoList
