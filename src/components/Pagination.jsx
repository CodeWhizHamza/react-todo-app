import React from 'react'

export default function Pagination({
  numberOfPages,
  pageNumber,
  setPageNumber,
}) {
  const prevPage = () => {
    if (pageNumber === 1) return setPageNumber(numberOfPages)
    setPageNumber(pageNumber - 1)
  }
  const nextPage = () => {
    if (pageNumber === numberOfPages) return setPageNumber(1)
    setPageNumber(pageNumber + 1)
  }
  if (numberOfPages <= 1) return ''
  return (
    <div className="btn-group d-flex justify-content-center mt-3">
      <button onClick={prevPage} className="btn btn-secondary">
        &laquo;
      </button>
      {Array(numberOfPages)
        .fill(0)
        .map((_, i) => {
          const page = i + 1

          const className =
            'btn btn-secondary' + (page === pageNumber ? ' active' : '')
          return (
            <button
              key={i}
              onClick={() => setPageNumber(page)}
              className={className}
            >
              {page}
            </button>
          )
        })}
      <button onClick={nextPage} className="btn btn-secondary">
        &raquo;
      </button>
    </div>
  )
}
