import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useRegister } from '../api/auth'

export default function Register() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const register = useRegister()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/campaigns'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    register.mutate({ displayName, email, password }, { onSuccess: () => navigate(from, { replace: true }) })
  }

  return (
    <div className="panel">
      <h1>Create an account</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Display name
          <input autoComplete="nickname" required maxLength={50} value={displayName} onChange={e => setDisplayName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password (8+ characters)
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {register.error && <p className="form-error">{register.error.message}</p>}
        <button className="btn" type="submit" disabled={register.isPending}>
          {register.isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login" state={location.state}>Log in</Link>
      </p>
    </div>
  )
}
