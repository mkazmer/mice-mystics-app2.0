import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './style/Nav.scss'

const Nav = () => {
  const [open, toggle] = useState(false)

  return (
    <div className="Nav">
      <div className="nav-bar">
        <Link to={{ pathname: '/app' }}>
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
      <div className={`nav-menu`}>
        <Link to={{ pathname: '/app' }}>App</Link>
        <Link to={{ pathname: '/campaigns' }}>Campaigns</Link>
        <Link to={{ pathname: '/' }}>Home</Link>
      </div>
    </div>
  )
}

export default Nav
