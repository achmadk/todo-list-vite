// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import TodoList from './TodoList'

describe('test TodoList component', () => {
  const todoHandlers = {
    onToggle: () => console.log('todo toggled'),
    onEdit: () => console.log('todo edited'),
    onDelete: () => console.log('todo deleted')
  }
  it('successfully render when error props value is true', () => {
    const { container, unmount } = render(
      <TodoList
        error
        completedTodos={[]}
        handleDeleteClick={todoHandlers.onDelete}
        handleEditClick={todoHandlers.onEdit}
        handleToggleClick={todoHandlers.onToggle}
      />
    )
    const errorMessageText = 'No todos available. Please try again later!'
    const errorEl = screen.getByText(errorMessageText)
    expect(container).toMatchSnapshot()
    expect(errorEl).not.toBeUndefined()
    unmount()
  })

  it('successfully render when todos props value is and completedTodos is an empty array', () => {
    const noAvailableTodosText = 'No todos available. Add a new task!'
    const { container, unmount } = render(
      <TodoList
        error={false}
        completedTodos={[]}
        handleDeleteClick={todoHandlers.onDelete}
        handleEditClick={todoHandlers.onEdit}
        handleToggleClick={todoHandlers.onToggle}
      />
    )

    expect(container).toMatchSnapshot()

    const addTodosEl = screen.getByText(noAvailableTodosText)
    expect(addTodosEl).not.toBeUndefined()

    unmount()
  })

  it('successfully render when todos props value is more than 1 and completedTodos is an empty array', async () => {
    const user = userEvent.setup()
    const component = (
      <TodoList
        error={false}
        todos={[{ id: 1, text: 'Hello world' }]}
        completedTodos={[]}
        handleDeleteClick={todoHandlers.onDelete}
        handleEditClick={todoHandlers.onEdit}
        handleToggleClick={todoHandlers.onToggle}
      />
    )
    const { container, unmount } = render(component)

    expect(container).toMatchSnapshot()

    const buttonToggle = screen.getByTestId<HTMLButtonElement>('button-toggle')
    await user.click(buttonToggle)

    const buttonEdit = screen.getByTestId<HTMLButtonElement>('button-edit')
    await user.click(buttonEdit)
    const inputUpdateTodoText = screen.getByTestId<HTMLInputElement>(
      'input-update-todo-text'
    )
    const btnSave = screen.getByTestId<HTMLButtonElement>('button-save')
    await user.type(inputUpdateTodoText, 'learn unit testing with vitest')
    await user.click(btnSave)

    const buttonDelete = screen.getByTestId<HTMLButtonElement>('button-delete')
    await user.click(buttonDelete)

    unmount()
  })

  it('successfully render when todos props value is more than 1', async () => {
    const user = userEvent.setup()
    const component = (
      <TodoList
        error={false}
        todos={[{ id: 1, text: 'Hello world' }]}
        completedTodos={[1]}
        handleDeleteClick={todoHandlers.onDelete}
        handleEditClick={todoHandlers.onEdit}
        handleToggleClick={todoHandlers.onToggle}
      />
    )
    const { container, unmount } = render(component)

    expect(container).toMatchSnapshot()

    // const spyOnToggle = vi.spyOn(todoHandlers, 'onToggle')
    const buttonToggle = screen.getByTestId('button-toggle')
    await user.click(buttonToggle)
    // rerender(component)
    // expect(spyOnToggle).toHaveBeenCalledOnce()

    unmount()
  })
})
