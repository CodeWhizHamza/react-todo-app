import React, { useEffect, useRef, useState, useCallback } from 'react'
import { v4 } from 'uuid'
// import _ from 'lodash'

// Import Components
import Form from './components/Form'
import TodoList from './components/TodoList'
import Select from './components/Select'

export default function App() {
  const inputRef = useRef(null)
  const selectRef = useRef(null)

  const [todos, setTodos] = useState([])
  const [renderTodo, setRenderTodo] = useState([])

  useEffect(() => {
    localStorage.getItem('todos') &&
      setTodos(JSON.parse(localStorage.getItem('todos')))
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    const { value } = inputRef.current
    if (value === '') return

    setTodos([...todos, { content: value, completed: false, id: v4() }])
    inputRef.current.value = null
  }
  function handleComplete(id) {
    let todosCopy = [...todos]
    const todo = toggleComplete(id, todosCopy)
    const index = getIndex(id, todos)
    todosCopy[index] = todo

    setTodos(todosCopy)
  }
  function toggleComplete(id, todos) {
    const todo = getItem(id, todos)
    todo.completed = !todo.completed
    return todo
  }
  function getItem(id, todos) {
    return todos.find(todo => todo.id === id)
  }
  function getIndex(id, todos) {
    return todos.findIndex(todo => todo.id === id)
  }
  function handleDelete(id) {
    const todosCopy = [...todos]
    const index = getIndex(id, todosCopy)
    todosCopy.splice(index, 1)
    setTodos(todosCopy)
  }
  const handleSelectChange = useCallback(() => {
    const { value } = selectRef.current
    if (value === 'all') setRenderTodo(todos)
    if (value === 'complete') setRenderTodo(todos.filter(t => t.completed))
    if (value === 'incomplete') setRenderTodo(todos.filter(t => !t.completed))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    handleSelectChange()
  }, [todos, handleSelectChange])

  return (
    <div className="container p-4 bg-light">
      <Form inputRef={inputRef} onSubmit={onSubmit} />
      <div className="row w-50 mx-auto px-3 mb-4">
        <Select
          handleChange={handleSelectChange}
          selectRef={selectRef}
          className="form-control ml-auto w-50"
        />
      </div>

      <TodoList
        todos={renderTodo}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
    </div>
  )
}
