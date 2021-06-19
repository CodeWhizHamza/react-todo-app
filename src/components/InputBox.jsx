import React from 'react'

export default function InputBox({ inputValue, inputRef, onChange }) {
  return (
    <input
      value={inputValue}
      onChange={onChange}
      ref={inputRef}
      name="todo"
      type="text"
      placeholder="Your todo..."
      className="form-control col-lg-11 col-md-10 col-sm-10 px-3"
      required
    />
  )
}
