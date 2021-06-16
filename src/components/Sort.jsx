import React from 'react'

export default function Sort({ fontClass }) {
  return (
    <button className="btn btn-outline-secondary">
      Sort <span className={fontClass}></span>
    </button>
  )
}
