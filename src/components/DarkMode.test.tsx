// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, describe, expect, it } from 'vitest'
import MatchMediaMock from 'vitest-matchmedia-mock'
import DarkMode from './DarkMode'

describe('test DarkMode component', () => {
  const matchMedia = new MatchMediaMock()
  it('render successfully', () => {
    const { container, unmount } = render(<DarkMode />)
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('render successfully in dark mode', () => {
    matchMedia.useMediaQuery('(prefers-color-scheme: dark)')
    const { container, unmount } = render(<DarkMode />)
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('successfully simulate click', async () => {
    const user = userEvent.setup()
    const { container, unmount } = render(<DarkMode />)
    const darkModeButton = screen.getByTestId('button-dark-mode')
    await user.click(darkModeButton)
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('successfully simulate click in dark mode', async () => {
    const user = userEvent.setup()
    matchMedia.useMediaQuery('(prefers-color-scheme: dark)')
    const { container, unmount } = render(<DarkMode />)
    const darkModeButton = screen.getByTestId('button-dark-mode')
    await user.click(darkModeButton)
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('successfully simulate keyboard press tab', async () => {
    const user = userEvent.setup()
    const { container, unmount } = render(<DarkMode />)
    const darkModeButton = screen.getByTestId('button-dark-mode')
    await user.type(darkModeButton, '[Tab]')
    expect(container).toMatchSnapshot()
    unmount()
  })

  it('successfully simulate keyboard press shift', async () => {
    const user = userEvent.setup()
    const { container, unmount } = render(<DarkMode />)
    const darkModeButton = screen.getByTestId('button-dark-mode')
    await user.type(darkModeButton, '[ShiftLeft]')
    expect(container).toMatchSnapshot()
    unmount()
  })

  afterEach(() => matchMedia.clear())

  afterAll(() => matchMedia.destroy())
})
