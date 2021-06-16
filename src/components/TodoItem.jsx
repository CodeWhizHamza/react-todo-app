import React from 'react'

export default function TodoItem({
  todo: { id, completed, content },
  onComplete,
  onDelete,
}) {
  return (
    <div className="row" key={id}>
      <div className="row align-items-start mb-4 py-2 mx-auto col-lg-6 col-md-8 col-sm-10">
        <input
          className="col-lg-1 w-auto col-md-1 col-sm-2 d-block form-check"
          onChange={() => onComplete(id)}
          type="checkbox"
          checked={completed}
        />
        <p
          onClick={() => onComplete(id)}
          className="col-lg-10 col-md-10 col-sm-8 align-items-center d-flex m-0"
        >
          {content}
        </p>
        <button
          onClick={() => onDelete(id)}
          className="col-lg-1 col-md-1 w-auto col-sm-2 btn btn-danger btn-sm"
        >
          <span className="fas fa-trash"></span>
        </button>
      </div>
    </div>
  )
}
