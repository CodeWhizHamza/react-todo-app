import React from 'react'
import InputBox from './InputBox'

export default function Form({ onSubmit, onEdit, isEdit, ...rest }) {
  const renderButton = () =>
    isEdit ? (
      <button
        onClick={onEdit}
        className="btn btn-warning col-lg-1 col-sm-2 col-md-2"
      >
        <span className="fa fa-edit"></span>
      </button>
    ) : (
      <button
        onClick={onSubmit}
        className="btn btn-primary col-lg-1 col-sm-2 col-md-2"
      >
        <span className="fa fa-plus"></span>
      </button>
    )

  return (
    <form className="form row">
      <div className="form-row mx-auto col-lg-6 col-md-8 col-sm-10 form-group">
        <InputBox {...rest} />
        {renderButton()}
      </div>
    </form>
  )
}
