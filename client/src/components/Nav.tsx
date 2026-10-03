import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useLogout, useMe } from '../api/auth'
import './Nav.scss'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { data: user } = useMe()
  const logout = useLogout()
  const navigate = useNavigate()
  const close = () => setOpen(false)

  return (
    <div className="Nav">
      <div onClick={close} className={`gray-mobile-nav-background ${open ? 'mobile-backgound-open' : ''}`}></div>
      <nav className={`nav-menu ${open ? 'open' : ''}`}>
        <Link onClick={close} to="/dashboard">
          Dashboard
        </Link>
        <Link onClick={close} to="/campaigns">
          Campaigns
        </Link>
        <Link onClick={close} to="/">
          Home
        </Link>
        {user ? (
          <button
            className="link-button"
            onClick={() => {
              close()
              logout.mutate(undefined, { onSuccess: () => navigate('/') })
            }}
          >
            Log out
          </button>
        ) : (
          <Link onClick={close} to="/login">
            Log in
          </Link>
        )}
      </nav>
      <div className="nav-bar">
        <Link onClick={close} to="/dashboard">
          <img className="mouse-icon" alt="Mouse Icon" src="/images/mouseIcon.png" />
        </Link>
      </div>
      <button onClick={() => setOpen(!open)} className="hamburger-button" aria-label="Toggle menu" aria-expanded={open}>
        <div className={`hamburger ${open ? 'close-x' : ''}`} />
      </button>
    </div>
  )
}
