import React from 'react'

export default function Form(props) {
  const { onSubmit, inputRef } = props

  return (
    <form className="form row" onSubmit={onSubmit}>
      <div className="form-row mx-auto col-lg-6 col-md-8 col-sm-10 form-group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Your todo..."
          className="form-control col-lg-11 col-md-10 col-sm-10 px-3"
        />
        <input
          type="submit"
          value="+"
          className="btn btn-success font-weight-bold px-3 col-lg-1 col-sm-2 col-md-2"
        />
      </div>
    </form>
  )
}
