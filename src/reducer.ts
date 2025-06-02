import type { Action, State } from './type'

export type Reducer<S, A> = (prevState: S, action?: A) => S

export const todoReducer: Reducer<State, Action | null> = (
  state: State,
  action: Action | null = null
): State => {
  switch (action?.type) {
    case 'SET_COMPLETED_TODOS':
      return { ...state, completedTodos: action.payload }
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        completedTodos: state.completedTodos.includes(action.payload)
          ? state.completedTodos.filter(id => id !== action.payload)
          : [...state.completedTodos, action.payload]
      }
    default:
      return state
  }
}
