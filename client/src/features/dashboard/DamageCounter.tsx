import { useState } from 'react'

export default function DamageCounter() {
  const [healthy, setHealthy] = useState(true)

  return (
    <button
      className="heart-button"
      aria-label={healthy ? 'Mark wounded' : 'Mark healthy'}
      onClick={() => setHealthy(!healthy)}
    >
      <div className={`heart ${healthy ? 'red' : ''}`}></div>
    </button>
  )
}
