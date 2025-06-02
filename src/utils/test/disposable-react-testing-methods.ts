import {
  type Queries,
  type RenderHookOptions,
  type RenderHookResult,
  type RenderOptions,
  type RenderResult,
  type queries,
  render,
  renderHook
} from '@testing-library/react'
import type { ReactNode } from 'react'
import type { Container as ReactDOMClientContainer } from 'react-dom/client'

export interface DisposableRenderOptions {
  /**
   * @default true
   */
  disposable?: boolean
}

export interface DisposableRenderOutput extends Disposable, RenderResult {}

export function disposableRender<
  Options extends DisposableRenderOptions = DisposableRenderOptions,
  Output extends DisposableRenderOutput = DisposableRenderOutput
>(
  ui: ReactNode,
  options?: RenderOptions,
  disposableRenderOptions?: Options
): Output {
  const disposable = disposableRenderOptions?.disposable ?? true

  const renderResults = render(ui, options)
  return {
    ...renderResults,
    [Symbol.dispose]() {
      if (disposable) {
        renderResults.unmount()
      }
    }
  } as Output
}

export type HydrateableContainer = Element | Document

export interface DisposableRenderHookOutput<Result = unknown, Props = unknown>
  extends Disposable,
    RenderHookResult<Result, Props> {}

export function disposableRenderHook<
  Result = unknown,
  Props = unknown,
  Q extends Queries = typeof queries,
  Container extends
    | ReactDOMClientContainer
    | HydrateableContainer = HTMLElement,
  BaseElement extends
    | ReactDOMClientContainer
    | HydrateableContainer = Container,
  Options extends DisposableRenderOptions = DisposableRenderOptions,
  Output extends DisposableRenderHookOutput<
    Result,
    Props
  > = DisposableRenderHookOutput<Result, Props>
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  disposableRenderOptions?: Options
): Output {
  const disposable = disposableRenderOptions?.disposable ?? true

  const renderHookResults = renderHook<
    Result,
    Props,
    Q,
    Container,
    BaseElement
  >(render, options)
  return {
    ...renderHookResults,
    [Symbol.dispose]() {
      if (disposable) {
        renderHookResults.unmount()
      }
    }
  } as Output
}
