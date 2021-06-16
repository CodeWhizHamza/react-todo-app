import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onComplete, onDelete, className }) {
  return (
    <div className={className}>
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
