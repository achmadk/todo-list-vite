import { Button, Field, Input } from '@headlessui/react'
import cn from 'clsx'
import { type ChangeEvent, type FC, memo, useRef, useState } from 'react'
import type { Todo } from '../type'

const TodoItem: FC<{
  todo: Todo
  isCompleted: boolean
  onToggle: () => void
  onEdit: (updatedTodo: Todo) => void
  onDelete: () => void
}> = memo(({ todo, isCompleted, onToggle, onEdit, onDelete }) => {
  const [isEditing, setEditing] = useState(false)
  const [updatedTodo, setUpdatedTodo] = useState(() => todo)

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const editFieldRef = useRef<HTMLInputElement>(null!)

  const handleInputUpdateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodo(prev => ({
      ...prev,
      text: event.target.value
    }))
  }
  const handleButtonEditClicked = () => {
    setEditing(true)
    setTimeout(() => {
      editFieldRef.current?.focus()
    }, 100)
  }

  const handleButtonSaveClicked = () => {
    onEdit(updatedTodo)
    setEditing(false)
  }
  const handleButtonCancelClicked = () => {
    setEditing(false)
  }

  return (
    <div className="flex py-2 items-center">
      {isEditing ? (
        <Field as="form" className="w-full">
          <div className="relative w-full">
            <Input
              ref={editFieldRef}
              type="text"
              id="update-todo"
              data-testid="input-update-todo-text"
              value={updatedTodo.text}
              className="block w-full h-10 p-4 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:border-blue-500 transition-colors duration-300"
              placeholder="Enter a new todo..."
              autoComplete="off"
              onChange={handleInputUpdateChanged}
            />
          </div>
        </Field>
      ) : (
        <p
          className={cn(
            'mr-auto text-ellipsis overflow-hidden transition-colors duration-300',
            {
              'line-through text-gray-800 dark:text-gray-400': isCompleted,
              'text-gray-900 dark:text-gray-100': !isCompleted
            }
          )}
        >
          {todo.text}
        </p>
      )}
      {!isEditing && (
        <Button
          data-testid="button-toggle"
          type="button"
          className={cn(
            'shrink-0 p-2 ml-4 text-sm font-medium rounded-lg transition-colors duration-300',
            {
              'bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-600 dark:hover:bg-gray-500':
                isCompleted,
              'bg-green-800 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-500':
                !isCompleted
            }
          )}
          onClick={onToggle}
        >
          {isCompleted ? 'Unmark' : 'Complete'}
        </Button>
      )}
      {!isCompleted && !isEditing && (
        <Button
          data-testid="button-edit"
          type="button"
          className="shrink-0 p-2 ml-4 text-sm font-medium rounded-lg bg-yellow-700 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors duration-300"
          onClick={handleButtonEditClicked}
        >
          Edit
        </Button>
      )}
      {isEditing && (
        <>
          <Button
            data-testid="button-save"
            type="button"
            className="shrink-0 p-2 ml-4 text-sm font-medium rounded-lg bg-yellow-700 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors duration-300"
            onClick={handleButtonSaveClicked}
          >
            Save
          </Button>
          <Button
            data-testid="button-cancel"
            type="button"
            className="shrink-0 p-2 ml-4 text-sm font-medium rounded-lg bg-red-800 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300"
            onClick={handleButtonCancelClicked}
          >
            Cancel
          </Button>
        </>
      )}
      {!isEditing && (
        <Button
          data-testid="button-delete"
          type="button"
          className="shrink-0 p-2 ml-4 text-sm font-medium rounded-lg bg-red-800 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300"
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
    </div>
  )
})

TodoItem.displayName = 'TodoItem'

export default TodoItem
