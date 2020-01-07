import React from 'react'

import RenderMovementDice from '../dice/RenderMovementDice'
import RenderActionDice from '../dice/RenderActionDice'
import './CreatureCard.scss'

const CreatureCard = ({ creature }) => {
  console.log(creature)
  return (
    <div className="CreatureCard">
      <div
        className="info-container"
        style={{
          background: `url(/images/creatures/${creature.image})`
        }}
      >
        <div className="name-container">
          <div>
            <div className="name">{creature.name}</div>
            <h5 className="id">{creature.id}</h5>
          </div>
          <button className="defeat-button">Defeat</button>
        </div>
        <div className="info">
          <h5>Movement</h5>
          <button
            className={`action-die-button ${creature.name === 'Brodie Pounces' ? 'hidden' : ''}`}
          >
            <RenderMovementDice
              rolls={creature.movementRoll}
              isPounce={creature.name === 'Brodie Pounces'}
            />
          </button>
        </div>
        <div className="info">
          <h5>Attack</h5>
          <button className="action-die-button">
            <RenderActionDice rolls={creature.attackRoll} type="attack" />
          </button>
        </div>
        <div className="info">
          <h5>Defense</h5>
          <button className="action-die-button">
            <RenderActionDice rolls={creature.defenseRoll} type="defense" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatureCard
