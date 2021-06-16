import React from 'react'

export default function Form(props) {
  const { onSubmit, inputRef } = props

  return (
    <form className="form px-5 pb-2 pt-5" onSubmit={onSubmit}>
      <div className="form-row form-group w-50 mx-auto">
        <input
          ref={inputRef}
          type="text"
          placeholder="Your todo..."
          className="form-control col-11 px-3"
        />
        <input
          type="submit"
          value="+"
          className="btn btn-success font-weight-bold px-3 col-1"
        />
      </div>
    </form>
  )
}
