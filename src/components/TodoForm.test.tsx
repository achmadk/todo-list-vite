// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import TodoForm from './TodoForm'

describe('test TodoForm component', () => {
  it('successfully simulate add todo', async () => {
    const user = userEvent.setup()
    const { container, unmount } = render(<TodoForm onAddTodo={console.log} />)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const fieldName = container.querySelector('#add-todo')!
    const buttonSubmitTodo = screen.getByTestId('button-submit-todo')
    await user.type(fieldName, 'develop app with vue')
    await user.click(buttonSubmitTodo)
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('successfully simulate fail on add todo', async () => {
    const user = userEvent.setup()
    const { container, unmount } = render(<TodoForm onAddTodo={console.log} />)
    const buttonSubmitTodo = screen.getByTestId('button-submit-todo')
    await user.click(buttonSubmitTodo)
    expect(container).toMatchSnapshot()
    unmount()
  })
})
