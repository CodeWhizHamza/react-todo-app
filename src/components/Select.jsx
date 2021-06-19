import React from 'react'

export default function Select({ filterValue, onChange }) {
  return (
    <div className="row">
      <div className="row col-lg-6 col-md-8 col-sm-10 mx-auto mb-5">
        <select
          value={filterValue}
          onChange={onChange}
          name="filter"
          className="form-control ml-auto col-lg-4 col-md-4 col-sm-12"
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Not Completed</option>
        </select>
      </div>
    </div>
  )
}
