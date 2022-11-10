import React from 'react'
import '../style/collect.scss'
import AllData from '../component/AllData.json'
import { useState, useEffect } from 'react'
import { FaHeart, FaUserCircle } from 'react-icons/fa'
import PaginationBar from './PaginationBar'
import _ from 'lodash' //使用_.chunk()

function Collect() {
  let response = AllData.data
  const [data, setData] = useState(response)
  const [filterData, setFilterData] = useState(data)
  const [optionValue, setOptionValue] = useState(0)
  const [userCollect, setUserCollect] = useState([])
  const [pageNow, setPageNow] = useState(1)
  const [perPage, setPerPage] = useState(12)
  const [pageTotal, setPageTotal] = useState(0)
  const [pageListDisplay, setPageListDisplay] = useState([])

  //   useEffect(() => {
  //     let newData = filterData.map((data) => {
  //       return userCollect.filter((c) => {
  //         return data.id === c
  //       })
  //     })
  //     const pageList = _.chunk(newData, perPage)
  //     console.log('d', pageList)

  //     if (pageList.length > 0) {
  //       setPageListDisplay(pageList)
  //     }
  //     // console.log('pageList', pageList)
  //   }, [filterData, perPage])
  //   //   console.log('display',pageListDisplay)

  const handleAddFav = (favoriteItemId) => {
    setUserCollect([...userCollect, favoriteItemId])
  }

  const handleDelFav = (favoriteItemId) => {
    setUserCollect(
      userCollect.filter((id) => {
        return id !== favoriteItemId
      })
    )
  }

  useEffect(() => {
    if (localStorage.getItem('collect') === null) return
    setUserCollect(JSON.parse(localStorage.getItem('collect')))
  }, [])

  useEffect(() => {
    localStorage.setItem('collect', JSON.stringify(userCollect))
  }, [userCollect])

  useEffect(() => {
    let newData = filterData.map((data, i) => {
      return userCollect.indexOf(data.id)
    })
    let newPageTotal = newData.filter((v) => {
      return v !== parseInt(-1)
    })
    let pageLength = newPageTotal.length
    let pageTotal = Math.ceil(pageLength / perPage)
    setPageTotal(pageTotal)
  }, [userCollect])

  //   console.log(pageTotal)

  return (
    <div className="collectPage">
      <div className="collecTitle">
        <FaUserCircle className="faUserCircleIcon" />
        <h2>我的收藏</h2>
      </div>
      <div className="cardWrap">
        {filterData.length > 0 &&
          filterData.map((data, i) => {
            return (
              <div key={i}>
                {userCollect.includes(data.id) ? (
                  <div className="cardItem">
                    <figure className="cardImg">
                      <img src="/image/banner01.jpg" alt={data.name} />
                    </figure>
                    <div className="cardText">
                      <div className="cardTextItem">
                        <div className="attractionsName">
                          <b>{data.name}</b>
                        </div>
                        {userCollect.includes(data.id) ? (
                          <FaHeart
                            className="faIcon delFav"
                            onClick={() => {
                              handleDelFav(data.id)
                            }}
                          />
                        ) : (
                          <FaHeart
                            className="faIcon addFav"
                            onClick={() => {
                              handleAddFav(data.id)
                            }}
                          />
                        )}
                      </div>
                      <div className="introduction">{data.introduction}</div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )
          })}
      </div>
      <PaginationBar
        pageNow={pageNow}
        perPage={perPage}
        setPageNow={setPageNow}
        setPerPage={setPerPage}
        pageTotal={pageTotal}
        setPageTotal={setPageTotal}
      />
    </div>
  )
}

export default Collect
