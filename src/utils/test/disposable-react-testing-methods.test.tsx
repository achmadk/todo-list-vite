import useTodoActions from '@/hooks/useTodoActions'
// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import {
  disposableRender,
  disposableRenderHook
} from './disposable-react-testing-methods'

describe('test disposableRender method', () => {
  it('when disposable option is true, unmount method not called automatically', () => {
    using renderResult = disposableRender(<h1>sample</h1>, undefined, {
      disposable: false
    })
    const spyUnmount = vi.spyOn(renderResult, 'unmount')
    try {
      const sampleElement = renderResult.container
      console.log(sampleElement.innerText)
    } finally {
      expect(spyUnmount).not.toHaveBeenCalled()
    }
  })
})

describe('test disposableRenderHook method', () => {
  it('when disposable option is true, unmount method not called automatically', () => {
    using renderHookResult = disposableRenderHook(
      () => useTodoActions(),
      undefined,
      { disposable: false }
    )
    const spyUnmount = vi.spyOn(renderHookResult, 'unmount')
    try {
      const todos = renderHookResult.result.current.todos
      console.log(todos?.length)
    } finally {
      expect(spyUnmount).not.toHaveBeenCalled()
    }
  })
})
