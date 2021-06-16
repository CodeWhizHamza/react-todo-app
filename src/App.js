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

  const onSubmit = e => {
    e.preventDefault()
    const { value } = inputRef.current
    if (value === '') return

    setTodos([...todos, { content: value, completed: false, id: v4() }])
    inputRef.current.value = null
  }
  const handleComplete = id => {
    let todosCopy = [...todos]
    const todo = toggleComplete(id, todosCopy)
    const index = getIndex(id, todos)
    todosCopy[index] = todo

    setTodos(todosCopy)
  }
  const toggleComplete = (id, todos) => {
    const todo = getItem(id, todos)
    todo.completed = !todo.completed
    return todo
  }
  const getItem = (id, todos) => {
    return todos.find(todo => todo.id === id)
  }
  const getIndex = (id, todos) => {
    return todos.findIndex(todo => todo.id === id)
  }
  const handleDelete = id => {
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
    localStorage.getItem('todos') &&
      setTodos(JSON.parse(localStorage.getItem('todos')))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    handleSelectChange()
  }, [todos, handleSelectChange])

  return (
    <div className="container p-4 bg-light">
      <h1 className="text-center">Todo app</h1>
      <Form inputRef={inputRef} onSubmit={onSubmit} />
      <div className="row">
        <div className="row col-lg-6 col-md-8 col-sm-10 mx-auto mb-5">
          <Select
            handleChange={handleSelectChange}
            selectRef={selectRef}
            className="form-control ml-auto col-lg-4 col-md-4 col-sm-12"
          />
        </div>
      </div>

      <TodoList
        className=""
        todos={renderTodo}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
    </div>
  )
}
