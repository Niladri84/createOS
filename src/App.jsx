import React, { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'

export default function App() {
  const [todos, setTodos] = useState([])

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Tasks</h1>
          <p className="text-slate-600">Stay organized and get things done</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Input Section */}
          <div className="border-b border-slate-200 p-6">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Stats Section */}
          {todos.length > 0 && (
            <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
              </div>
            </div>
          )}

          {/* Todos List Section */}
          <div className="p-6">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-slate-500 font-medium">No tasks yet</p>
                <p className="text-slate-400 text-sm mt-1">Add one to get started</p>
              </div>
            ) : (
              <>
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />

                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="w-full mt-6 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Clear completed ({completedCount})
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Built with React • Data saved locally</p>
        </div>
      </div>
    </div>
  )
}