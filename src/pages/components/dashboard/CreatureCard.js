import React from 'react'

import RenderMovementDice from '../dice/RenderMovementDice'
import RenderActionDice from '../dice/RenderActionDice'
import Ability from './Ability'
import './CreatureCard.scss'

const CreatureCard = ({ creature, removeCreature, updateRoll }) => {
  return (
    <div className="CreatureCard">
      <div
        className="info-container"
        style={{
          background: `url(/images/creatures/${creature.image})`
        }}
      >
        <div className="name-container">
          <div className="name">
            <div>{creature.name}</div>
            <button className="defeat-button" onClick={() => removeCreature(creature.id)}>
              X
            </button>
          </div>
          <div className="creature-details">
            <h5 className={`id ${creature.isBoss ? 'hidden' : ''}`}>{creature.id}</h5>
            <div className="abilities">
              {creature.abilities.map(a => {
                return <Ability key={a.title} ability={a} />
              })}
            </div>
          </div>
        </div>
        <div className="info">
          <h5 className={`${creature.isBrodiePounces ? 'fill' : ''}`}>Movement</h5>
          <button
            className="action-die-button"
            onClick={() => updateRoll(creature, 'movementRoll')}
          >
            {creature.isBrodiePounces ? null : <RenderMovementDice rolls={creature.movementRoll} />}
          </button>
        </div>
        <div className="info">
          <h5>Attack</h5>
          <button className="action-die-button" onClick={() => updateRoll(creature, 'attackRoll')}>
            <RenderActionDice rolls={creature.attackRoll} type="attack" />
          </button>
        </div>
        <div className="info">
          <h5>Defense</h5>
          <button className="action-die-button" onClick={() => updateRoll(creature, 'defenseRoll')}>
            <RenderActionDice rolls={creature.defenseRoll} type="defense" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatureCard
