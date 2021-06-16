import React from 'react'

export default function TodoItem({
  todo: { id, completed, content },
  onComplete,
  onDelete,
}) {
  return (
    <div key={id} className="row align-items-start mb-3 w-50 mx-auto">
      <input
        className="col-1 d-block form-check"
        onChange={() => onComplete(id)}
        type="checkbox"
        checked={completed}
      />
      <p
        onClick={() => onComplete(id)}
        className="col-10 align-items-center d-flex m-0"
      >
        {content}
      </p>
      <button
        onClick={() => onDelete(id)}
        className="col-1 btn btn-danger btn-sm"
      >
        &times;
      </button>
    </div>
  )
}
