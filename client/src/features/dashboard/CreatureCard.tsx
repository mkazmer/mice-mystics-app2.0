import { ActionDice, MovementDice } from '../dice/DiceResults'
import Ability from './Ability'
import DamageCounter from './DamageCounter'
import type { ActiveCreature, RollKind } from './dashboardReducer'
import './CreatureCard.scss'

type Props = {
  creature: ActiveCreature
  onRemove: (key: string) => void
  onRoll: (kind: RollKind, key: string) => void
}

export default function CreatureCard({ creature, onRemove, onRoll }: Props) {
  const noMovement = creature.movementDice === 0

  return (
    <div className="CreatureCard">
      <div className="info-container" style={{ background: `url(/images/creatures/${creature.image})` }}>
        <div className="name-container">
          <div className="name">
            <div>{creature.name}</div>
            <div className="heart-container">
              {Array.from({ length: creature.health }, (_, i) => (
                <DamageCounter key={i} />
              ))}
            </div>
          </div>
          <div className="creature-details">
            <button className="defeat-button" aria-label={`Remove ${creature.name}`} onClick={() => onRemove(creature.key)}>
              X
            </button>
            <h5 className={`id ${creature.label ? '' : 'hidden'}`}>{creature.label}</h5>
            <div className="abilities">
              {creature.abilities.map(a => (
                <Ability key={a.title} ability={a} />
              ))}
            </div>
          </div>
        </div>
        <div className="info">
          <h5 className={noMovement ? 'fill' : ''}>Movement</h5>
          <button className="action-die-button" onClick={() => onRoll('movement', creature.key)}>
            {noMovement ? null : <MovementDice rolls={creature.rolls.movement} />}
          </button>
        </div>
        <div className="info">
          <h5>Attack</h5>
          <button className="action-die-button" onClick={() => onRoll('attack', creature.key)}>
            <ActionDice rolls={creature.rolls.attack} />
          </button>
        </div>
        <div className="info">
          <h5>Defense</h5>
          <button className="action-die-button" onClick={() => onRoll('defense', creature.key)}>
            <ActionDice rolls={creature.rolls.defense} />
          </button>
        </div>
      </div>
    </div>
  )
}
