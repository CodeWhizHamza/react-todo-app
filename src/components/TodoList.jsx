import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onComplete, onDelete }) {
  return (
    <div className="px-5 mx-5">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
