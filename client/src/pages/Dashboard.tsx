import { useReducer, useState } from 'react'
import BossAdd from '../features/dashboard/BossAdd'
import ButtonContainer from '../features/dashboard/ButtonContainer'
import CreatureCard from '../features/dashboard/CreatureCard'
import {
  dashboardReducer,
  initialDashboardState,
  rollFor,
  type RollKind,
} from '../features/dashboard/dashboardReducer'
import MinionsAdd from '../features/dashboard/MinionsAdd'
import './Dashboard.scss'

// Dice are cleared briefly before showing new results so repeat rolls visibly change
const ROLL_FLASH_MS = 200

export default function Dashboard() {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState)
  const [modal, setModal] = useState<'minions' | 'boss' | null>(null)

  const roll = (kind: RollKind, key?: string) => {
    const targets = key ? state.creatures.filter(c => c.key === key) : state.creatures
    const rolls = Object.fromEntries(targets.map(c => [c.key, rollFor(c, kind)]))

    dispatch({ type: 'clearRolls', kind, key })
    setTimeout(() => dispatch({ type: 'setRolls', kind, rolls }), ROLL_FLASH_MS)
  }

  return (
    <div className="Dashboard">
      <ButtonContainer
        onRollAll={kind => roll(kind)}
        onAddMinions={() => setModal('minions')}
        onAddBoss={() => setModal('boss')}
        onClearAll={() => dispatch({ type: 'clearRolls', kind: 'all' })}
      />
      {modal === 'minions' && (
        <MinionsAdd onAdd={counts => dispatch({ type: 'addMinions', counts })} onClose={() => setModal(null)} />
      )}
      {modal === 'boss' && (
        <BossAdd onAdd={bossId => dispatch({ type: 'addBoss', bossId })} onClose={() => setModal(null)} />
      )}
      <div className="creature-container">
        {state.creatures.map(creature => (
          <CreatureCard
            key={creature.key}
            creature={creature}
            onRemove={key => dispatch({ type: 'remove', key })}
            onRoll={roll}
          />
        ))}
      </div>
    </div>
  )
}
