import React from 'react'

export default function TodoItem({
  todo: { id, completed, content },
  onComplete,
  onDelete,
  onEdit,
}) {
  return (
    <div className="row p-3" key={id}>
      <div className="row align-items-md-center mx-auto col-lg-6 col-md-8 col-sm-10">
        <div className="col-lg-1 col-md-1 col-sm-2 p-0">
          <input
            className="form-check"
            onChange={e => onComplete(id, e)}
            type="checkbox"
            checked={completed}
          />
        </div>
        <p
          onClick={e => onComplete(id, e)}
          className="col-lg-9 col-md-9 col-sm-8 m-0 p-0 break-word"
        >
          {content}
        </p>
        <div className="btn-group col-lg-2 col-md-2 col-sm-2 justify-content-md-center p-0">
          <button onClick={() => onEdit(id)} className="btn btn-warning btn-sm">
            <span className="fas fa-edit"></span>
          </button>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-danger btn-sm"
          >
            <span className="fas fa-trash"></span>
          </button>
        </div>
      </div>
    </div>
  )
}
