// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { disposableRender } from '@/utils'
import TodoItem from './TodoItem'

describe('test TodoItem component', () => {
  const todoHandlers = {
    onToggle: () => console.log('todo toggled'),
    onEdit: () => console.log('todo edited'),
    onDelete: () => console.log('todo deleted')
  }
  it('render successfully', async () => {
    using renderResult = disposableRender(
      <TodoItem
        todo={{ id: 1, text: 'learn unit testing' }}
        isCompleted
        onToggle={todoHandlers.onToggle}
        onEdit={todoHandlers.onEdit}
        onDelete={todoHandlers.onDelete}
      />
    )
    expect(renderResult.container).toMatchSnapshot()
  })

  it('render successfully when isCompleted value is false', () => {
    using renderResult = disposableRender(
      <TodoItem
        todo={{ id: 1, text: 'learn unit testing' }}
        isCompleted={false}
        onToggle={todoHandlers.onToggle}
        onEdit={todoHandlers.onEdit}
        onDelete={todoHandlers.onDelete}
      />
    )
    expect(renderResult.container).toMatchSnapshot()
  })

  it('render successfully when todo data is being updated', async () => {
    const user = userEvent.setup()
    const component = (
      <TodoItem
        todo={{ id: 1, text: 'learn unit testing' }}
        isCompleted={false}
        onToggle={todoHandlers.onToggle}
        onEdit={todoHandlers.onEdit}
        onDelete={todoHandlers.onDelete}
      />
    )
    using renderResult = disposableRender(component)
    const btnEdit = screen.getByTestId('button-edit')
    await user.click(btnEdit)
    renderResult.rerender(component)
    expect(renderResult.container).toMatchSnapshot()
  })

  it('render successfully when todo data is updated by user', async () => {
    const user = userEvent.setup()
    const component = (
      <TodoItem
        todo={{ id: 1, text: 'learn unit testing' }}
        isCompleted={false}
        onToggle={todoHandlers.onToggle}
        onEdit={todoHandlers.onEdit}
        onDelete={todoHandlers.onDelete}
      />
    )
    using renderResult = disposableRender(component)
    const btnEdit = screen.getByTestId<HTMLButtonElement>('button-edit')
    await user.click(btnEdit)
    renderResult.rerender(component)
    const inputUpdateTodoText = screen.getByTestId<HTMLInputElement>(
      'input-update-todo-text'
    )
    const btnSave = screen.getByTestId<HTMLButtonElement>('button-save')
    await user.type(inputUpdateTodoText, 'learn unit testing with vitest')
    await user.click(btnSave)
    renderResult.rerender(component)
    expect(renderResult.container).toMatchSnapshot()
  })

  it('render successfully when todo data is cancel updated by user', async () => {
    const user = userEvent.setup()
    const component = (
      <TodoItem
        todo={{ id: 1, text: 'learn unit testing' }}
        isCompleted={false}
        onToggle={todoHandlers.onToggle}
        onEdit={todoHandlers.onEdit}
        onDelete={todoHandlers.onDelete}
      />
    )
    using renderResult = disposableRender(component)
    const btnEdit = screen.getByTestId<HTMLButtonElement>('button-edit')
    await user.click(btnEdit)
    renderResult.rerender(component)
    const btnCancel = screen.getByTestId<HTMLButtonElement>('button-cancel')
    await user.click(btnCancel)
    renderResult.rerender(component)
    expect(renderResult.container).toMatchSnapshot()
  })
})
