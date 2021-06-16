import React from 'react'

export default function Select({ className, selectRef, handleChange }) {
  return (
    <select
      onChange={handleChange}
      defaultValue="all"
      ref={selectRef}
      className={className}
    >
      <option value="all">All</option>
      <option value="complete">Complete</option>
      <option value="incomplete">Not Completed</option>
    </select>
  )
}
