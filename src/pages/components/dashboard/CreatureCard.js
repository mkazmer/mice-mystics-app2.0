import React from 'react'

import DamageCounter from './DamageCounter'
import RenderMovementDice from '../dice/RenderMovementDice'
import RenderActionDice from '../dice/RenderActionDice'
import Ability from './Ability'
import './CreatureCard.scss'

const CreatureCard = ({ creature, removeCreature, updateRoll, clearIndividual }) => {
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
            <div className="heart-container">
              {Array.from(Array(creature.health), () => {
                return <DamageCounter />
              })}
            </div>
          </div>
          <div className="creature-details">
            <button className="defeat-button" onClick={() => removeCreature(creature.id)}>
              X
            </button>
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
            onClick={() => {
              clearIndividual(creature, 'movementRoll')
              setTimeout(() => {
                updateRoll(creature, 'movementRoll')
              }, 200)
            }}
          >
            {creature.isBrodiePounces ? null : <RenderMovementDice rolls={creature.movementRoll} />}
          </button>
        </div>
        <div className="info">
          <h5>Attack</h5>
          <button
            className="action-die-button"
            onClick={() => {
              clearIndividual(creature, 'attackRoll')
              setTimeout(() => {
                updateRoll(creature, 'attackRoll')
              }, 200)
            }}
          >
            <RenderActionDice rolls={creature.attackRoll} type="attack" />
          </button>
        </div>
        <div className="info">
          <h5>Defense</h5>
          <button
            className="action-die-button"
            onClick={() => {
              clearIndividual(creature, 'defenseRoll')
              setTimeout(() => {
                updateRoll(creature, 'defenseRoll')
              }, 200)
            }}
          >
            <RenderActionDice rolls={creature.defenseRoll} type="defense" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatureCard
