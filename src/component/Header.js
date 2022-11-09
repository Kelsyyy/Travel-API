import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../style/header.scss'

const pages = [
  { id: 1, title: '遊憩景點', route: '/' },
  { id: 2, title: '我的最愛', route: '/favorite' },
]

function Header({ fixed = true }) {
  return (
    <>
      <header
        className={`header ${
          fixed ? 'position-fixed' : ''
        } d-flex shadow-sm w-100`}
      >
        <Link to="/">
          <div className="webSiteLogo">
            <img src="/image/logo.png" alt="travel" />
          </div>
        </Link>
        <nav className="nav">
          <ul className="navItem list-unstyled active">
            {pages.map((page) => {
              return (
                <li key={page.id}>
                  <NavLink
                    to={page.route}
                    className={(nav) => (nav.isActive ? 'active' : '')}
                  >
                    {page.title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
