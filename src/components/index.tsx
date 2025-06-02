import ReactDocumentPiP from 'react-document-picture-in-picture'

import useTodoActions from '../hooks/useTodoActions'
import DarkMode from './DarkMode'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const TodoPage = () => {
  const {
    todos,
    error,
    completedTodos,
    handleAddTodo,
    handleEditClick,
    handleDeleteClick,
    handleToggleClick
  } = useTodoActions()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 m-4 w-full lg:w-3/4 lg:max-w-xl transition-colors duration-300">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Todo List
            </h1>
            <DarkMode />
          </div>
          {!error && <TodoForm onAddTodo={handleAddTodo} />}
        </div>
        <TodoList
          todos={todos ?? []}
          error={error}
          completedTodos={completedTodos}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleToggleClick={handleToggleClick}
        />
      </div>
    </div>
  )
}

// export default TodoPage

const App = () => {
  return (
    <ReactDocumentPiP
      featureUnavailableRenderer={(reason) => reason && <TodoPage />}
      buttonRenderer={({ open, close, toggle, isOpen }) => 
        <div>
            <b>Is {isOpen ? 'Open' : 'Closed'}</b>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={open}>Open</button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={close}>Close</button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={toggle}>Toggle</button>
        </div>}
    >
      <TodoPage />
    </ReactDocumentPiP>
  )
}

export default App
