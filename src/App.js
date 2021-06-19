import React, { useCallback, useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
import empty from './empty.svg'

// Import Components
import Form from './components/Form'
import TodoList from './components/TodoList'
import Select from './components/Select'
import Pagination from './components/Pagination'

export default function App() {
  const inputRef = useRef(null)

  // * States
  const [inputValue, setInputValue] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const itemsPerPage = 8

  const [todos, setTodos] = useState([])
  const [renderTodo, setRenderTodo] = useState([])
  const [paginated, setPaginated] = useState([])

  // Functions

  /**
   * @param  {} if(inputValue===''
   * @param  {inputValue} returnconstnewTodos=[{content
   * @param  {false} completed
   * @param  {v4(} id
   */
  const handleSubmit = e => {
    e.preventDefault()
    if (inputValue === '') return

    const newTodos = [
      { content: inputValue, completed: false, id: v4() },
      ...todos,
    ]
    setTodos(newTodos)
    setInputValue('')
  }

  /**
   * @param  {input}} {target
   */
  const handleChange = ({ target: input }) => {
    if (input.name === 'todo') setInputValue(input.value)
    if (input.name === 'filter') {
      setFilterValue(input.value)
    }
  }
  /**
   * @param  {} id
   * @param  {} e
   * @param  {} =>{consttodosCopy=[...todos]consttodo=toggleComplete(id
   * @param  {} todosCopy
   * @param  {} constelement=e.target.closest('.row'
   * @param  {} if(element
   * @param  {} toggleStyle(element
   * @param  {} todo.completed
   * @param  {} constindex=getIndex(id
   * @param  {} todos
   * @param  {} todosCopy[index]=todosetTodos(todosCopy
   */
  const handleComplete = (id, e) => {
    const todosCopy = [...todos]

    const todo = toggleComplete(id, todosCopy)

    const element = e.target.closest('.row')
    if (element) toggleStyle(element, todo.completed)

    const index = getIndex(id, todos)
    todosCopy[index] = todo

    setTodos(todosCopy)
  }
  const toggleComplete = (id, todos) => {
    const todo = getItem(id, todos)
    todo.completed = !todo.completed
    return todo
  }
  const toggleStyle = (element, completed) => {
    if (completed) element.style.textDecoration = 'line-through'
    if (!completed) element.style.textDecoration = 'none'
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
    // if () return
    todosCopy.splice(index, 1)
    setTodos(todosCopy)
  }
  const handleSelectChange = useCallback(() => {
    if (filterValue === 'all') setRenderTodo(todos)
    if (filterValue === 'complete')
      setRenderTodo(todos.filter(t => t.completed))
    if (filterValue === 'incomplete')
      setRenderTodo(todos.filter(t => !t.completed))
  }, [todos, filterValue])

  const focusEdit = id => {
    const todosCopy = [...todos]
    const todo = getItem(id, todosCopy)

    setInputValue(todo.content)
    inputRef.current.focus()

    setIsEditing(true)
    setEditId(id)
  }
  const handleEdit = e => {
    e.preventDefault()
    const todosCopy = [...todos]
    const todo = getItem(editId, todosCopy)
    todo.content = inputValue

    setTodos(todosCopy)
    setInputValue('')
    setIsEditing(false)
    setEditId(null)
  }
  const paginate = useCallback(() => {
    const page = pageNumber - 1
    const start = itemsPerPage * page
    const end = start + itemsPerPage

    const items = renderTodo.slice(start, end)
    setPaginated(items)
  }, [renderTodo, pageNumber])

  const renderTodos = () =>
    renderTodo.length ? (
      <TodoList
        todos={paginated}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onEdit={focusEdit}
      />
    ) : (
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p>No todos found!</p>
        <p>
          Type above in the box and click <span className="fa fa-plus"></span>{' '}
          to add todos
        </p>
        <img className="w-50" alt="img" src={empty} />
      </div>
    )

  // Effect hooks
  useEffect(() => {
    const items = localStorage.getItem('todos')
    if (items) setTodos(JSON.parse(items))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    paginate()
  }, [todos, paginate])
  useEffect(() => {
    handleSelectChange()
  }, [filterValue, handleSelectChange])

  return (
    <div className="container p-4 bg-light">
      <h1 className="text-center">Todo app</h1>
      <Form
        onEdit={handleEdit}
        onSubmit={handleSubmit}
        onChange={handleChange}
        inputValue={inputValue}
        isEdit={isEditing}
        inputRef={inputRef}
      />
      <Select filterValue={filterValue} onChange={handleChange} />

      {renderTodos()}

      <Pagination
        numberOfPages={Math.ceil(renderTodo.length / itemsPerPage)}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  )
}
