import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, className, ...rest }) {
  return (
    <div className={className}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...rest} />
      ))}
    </div>
  )
}
