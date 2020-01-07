import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './style/Nav.scss'

const Nav = () => {
  const [open, toggle] = useState(false)

  return (
    <div className="Nav">
      <div
        onClick={() => {
          toggle(false)
        }}
        className={`gray-mobile-nav-background ${open ? 'mobile-backgound-open' : ''}`}
      ></div>
      <div className={`nav-menu ${open ? 'open' : ''}`}>
        <Link
          onClick={() => {
            toggle(false)
          }}
          to={{ pathname: '/dashboard' }}
        >
          Dashboard
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
          toggle(!open)
        }}
        className="hamburger-button"
      >
        <div className={`hamburger ${open ? 'close-x' : ''}`} />
      </button>
    </div>
  )
}

export default Nav
