// @vitest-environment jsdom
import { render } from '@testing-library/react'
import { afterAll, afterEach, describe, expect, it } from 'vitest'
import MatchMediaMock from 'vitest-matchmedia-mock'
import App from './App'

describe('Test App component', () => {
  const matchMedia = new MatchMediaMock()

  it('render successfully', () => {
    const { unmount, container } = render(<App />)
    expect(container.innerHTML).toMatchSnapshot()
    unmount()
  })

  it('render successfully in dark mode', () => {
    matchMedia.useMediaQuery('(prefers-color-scheme: dark)')
    const { unmount, container } = render(<App />)
    expect(container.innerHTML).toMatchSnapshot()
    unmount()
  })

  afterEach(() => matchMedia.clear())

  afterAll(() => matchMedia.destroy())
})
