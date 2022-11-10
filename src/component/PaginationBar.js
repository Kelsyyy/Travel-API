import React from 'react'
import '../style/paginationBar.scss'
import { useState, useEffect } from 'react'

const PaginationBar = ({
  pageNow = 1,
  setPageNow,
  perPage,
  setPerPage,
  pageTotal = 0,
  setPageTotal,
}) => {
  return (
    <>
      <div className="pagination">
        <a
          href="#/"
          onClick={() => {
            setPageNow(1)
          }}
        >
          &laquo;
        </a>
        {Array(pageTotal)
          .fill(1)
          .map((v, i) => {
            return (
              <a
                key={i}
                href="#/"
                className={i + 1 === pageNow ? 'active' : ''}
                onClick={() => {
                  setPageNow(i + 1)
                }}
              >
                {i + 1}
              </a>
            )
          })}
        <a
          href="#/"
          onClick={() => {
            setPageNow(pageTotal)
          }}
        >
          &raquo;
        </a>
      </div>
    </>
  )
}

export default PaginationBar
