import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './style/Nav.scss'

const Nav = () => {
  const [open, toggle] = useState(false)

  return (
    <div className="Nav">
      <div className="nav-bar">
        <Link
          onClick={() => {
            toggle(false)
          }}
          to={{ pathname: '/app' }}
        >
          <img className="mouse-icon" alt="Mouse Icon" src={'./images/mouseIcon.png'} />
        </Link>
      </div>
      <button
        onClick={() => {
          toggle(true)
        }}
        className="hamburger-button"
      >
        <div className="hamburger" />
      </button>
      <div className={`nav-menu ${open ? 'open' : ''}`}>
        <Link
          onClick={() => {
            toggle(false)
          }}
          to={{ pathname: '/app' }}
        >
          App
        </Link>
        <Link
          onClick={() => {
            toggle(false)
          }}
          to={{ pathname: '/campaigns' }}
        >
          Campaigns
        </Link>
        <Link
          onClick={() => {
            toggle(false)
          }}
          to={{ pathname: '/' }}
        >
          Home
        </Link>
      </div>
    </div>
  )
}

export default Nav
