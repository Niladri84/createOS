import React from 'react'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-slate-300 hover:border-blue-500 transition-colors flex items-center justify-center"
        style={{
          backgroundColor: todo.completed ? '#10b981' : 'transparent',
          borderColor: todo.completed ? '#10b981' : 'currentColor'
        }}
      >
        {todo.completed && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Text */}
      <span
        className="flex-1 font-medium text-slate-900 transition-all"
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#94a3b8' : 'currentColor'
        }}
      >
        {todo.text}
      </span>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}