import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../style/travel.scss'
import AllData from '../component/AllData.json'
import { Link } from 'react-router-dom'
import _ from 'lodash' //使用_.chunk()
import { FaHeart } from 'react-icons/fa'
import PaginationBar from './PaginationBar'

const sortOption = [
  { value: 11, label: '養生溫泉' },
  { value: 12, label: '單車遊蹤' },
  { value: 13, label: '歷史建築' },
  { value: 14, label: '宗教信仰' },
  { value: 15, label: '藝文館所' },
  { value: 16, label: '戶外踏青' },
  { value: 17, label: '藍色水路' },
  { value: 18, label: '公共藝術' },
  { value: 19, label: '親子共遊' },
  { value: 20, label: '北北基景點' },
  { value: 23, label: '夜市商圈' },
  { value: 24, label: '主題商街' },
  { value: 25, label: '無障礙旅遊推薦景點' },
]

function Travel() {
  let response = AllData.data
  const [data, setData] = useState(response)
  const [filterData, setFilterData] = useState(data)
  const [optionValue, setOptionValue] = useState(0)
  const [userCollect, setUserCollect] = useState([]) //收藏

  // 篩選
  useEffect(() => {
    let option = parseInt(optionValue)

    let newData = data.filter((d) => {
      // console.log('cate', d.category)
      let cateResult = d.category.filter((cate) => {
        return cate.id === option
      })

      return cateResult.length !== 0
    })
    setFilterData(newData)

    if (newData.length === 0) {
      setFilterData(data)
    }
    // console.log('newdata', newData)
  }, [optionValue])

  // 分頁
  const [pageNow, setPageNow] = useState(1) //目前第幾頁
  const [perPage, setPerPage] = useState(12) //每頁幾筆資料
  const [pageTotal, setPageTotal] = useState(0) //總共幾頁
  const [pageListDisplay, setPageListDisplay] = useState([])
  // console.log(pageListDisplay)

  useEffect(() => {
    const pageList = _.chunk(filterData, perPage)
    // console.log('pageList',pageList)

    if (pageList.length > 0) {
      setPageTotal(pageList.length)
      setPageListDisplay(pageList)
    }
  }, [filterData, perPage])

  // const paginationBar = (
  //   <>
  //     <div className="pagination">
  //       <a
  //         href="#/"
  //         onClick={() => {
  //           setPageNow(1)
  //         }}
  //       >
  //         &laquo;
  //       </a>
  //       {Array(pageTotal)
  //         .fill(1)
  //         .map((v, i) => {
  //           return (
  //             <a
  //               key={i}
  //               href="#/"
  //               className={i + 1 === pageNow ? 'active' : ''}
  //               onClick={() => {
  //                 setPageNow(i + 1)
  //               }}
  //             >
  //               {i + 1}
  //             </a>
  //           )
  //         })}
  //       <a
  //         href="#/"
  //         onClick={() => {
  //           setPageNow(pageTotal)
  //         }}
  //       >
  //         &raquo;
  //       </a>
  //     </div>
  //   </>
  // )

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

  return (
    <>
      <main className="travelPage">
        <div className="bannerWrap">
          <h2 className="bannerText">景點搜尋</h2>
          <div className="bannerImg">
            <img src="/image/banner01.jpg" alt="taipei-travel" />
          </div>
        </div>
        <section className="col-11 mx-auto sectionContent">
          <div className="sortWrap">
            <select
              className="form-select"
              onChange={(e) => {
                setOptionValue(e.target.value)
              }}
            >
              <option>全部</option>
              {sortOption.map((option, i) => {
                return (
                  <option value={option.value} key={i}>
                    {option.label}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="cardWrap">
            {pageListDisplay.length > 0 &&
              pageListDisplay[pageNow - 1].map((data, i) => {
                return (
                  <div className="cardItem " key={i}>
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
                )
              })}
          </div>
        </section>
      </main>
      <PaginationBar
        pageNow={pageNow}
        perPage={perPage}
        setPageNow={setPageNow}
        setPerPage={setPerPage}
        pageTotal={pageTotal}
        setPageTotal={setPageTotal}
      />
    </>
  )
}

export default Travel
