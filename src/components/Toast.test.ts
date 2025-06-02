// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { showErrorToast, showSuccessToast } from './Toast'

describe('test Toast methods', () => {
  it('successfully call showSuccessToast', () => {
    const result = showSuccessToast('Todo Added Successfully!')
    expect(result).toBeUndefined()
  })

  it('successfully call showErrorToast', () => {
    const result = showErrorToast('Failed to add todo!')
    expect(result).toBeUndefined()
  })
})
