import { Navigate, Outlet, useLocation } from 'react-router'
import { useMe } from '../api/auth'

// Wrap routes that need a logged-in user; sends everyone else to /login and back afterwards
export default function RequireAuth() {
  const { data: user, isPending } = useMe()
  const location = useLocation()

  if (isPending) return <p>Loading…</p>
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
