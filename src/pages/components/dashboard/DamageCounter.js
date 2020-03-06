import React, { useState } from 'react'

const DamageCounter = () => {
  const [heart, toggleHeart] = useState(true)
  return (
    <button className="heart-button" onClick={() => toggleHeart(!heart)}>
      <div className={`heart ${heart ? 'red' : ''}`}></div>
    </button>
  )
}

export default DamageCounter
