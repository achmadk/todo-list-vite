import { Button, Description, Field, Input, Label } from '@headlessui/react'
import DOMPurify from 'dompurify'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import type { TodoFormProps } from '../type'

const TodoForm: FC<TodoFormProps> = ({ onAddTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setFocus
  } = useForm<{ name: string }>({
    mode: 'all'
  })
  const inputNameFieldProps = register('name', {
    required: 'This field is required',
    minLength: { value: 3, message: 'Minimum 3 characters' },
    maxLength: { value: 20, message: 'Maximum 20 characters' }
  })

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input)
  }

  const onSubmit = async (data: { name: string }) => {
    const isValid = await trigger('name')
    /* v8 ignore next */
    if (!isValid) return // Prevent the form if there is an error

    setFocus('name')

    const sanitizedData = sanitizeInput(data.name)
    onAddTodo(sanitizedData)
    reset()
  }

  return (
    <Field as="form" onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <Label htmlFor="add-todo" className="sr-only">
        Add new todo
      </Label>
      <div className="relative">
        <Input
          type="text"
          id="add-todo"
          className="block w-full p-4 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:border-blue-500 transition-colors duration-300"
          placeholder="Enter a new todo..."
          {...inputNameFieldProps}
          aria-invalid={errors.name ? 'true' : 'false'}
          autoComplete="off"
        />
        <Button
          data-testid="button-submit-todo"
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
        >
          Create
        </Button>
      </div>
      <div className="mt-2">
        {errors.name && (
          <Description className="text-sm text-red-600 dark:text-red-500 transition-colors duration-300">
            {errors.name.message}
          </Description>
        )}
      </div>
    </Field>
  )
}

export default TodoForm
