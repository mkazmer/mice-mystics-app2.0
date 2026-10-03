import type { RollKind } from './dashboardReducer'
import './ButtonContainer.scss'

type Props = {
  onRollAll: (kind: RollKind) => void
  onAddMinions: () => void
  onAddBoss: () => void
  onClearAll: () => void
}

export default function ButtonContainer({ onRollAll, onAddMinions, onAddBoss, onClearAll }: Props) {
  return (
    <div className="ButtonContainer">
      <div className="buttons rolls">
        <button onClick={() => onRollAll('movement')}>
          Roll All <div className="movement">Movement</div>
        </button>
        <button onClick={() => onRollAll('attack')}>
          Roll All <div className="attack">Attack</div>
        </button>
        <button onClick={() => onRollAll('defense')}>
          Roll All <div className="defense">Defense</div>
        </button>
      </div>
      <div className="buttons adds">
        <button onClick={onAddMinions}>
          Add <div className="creature">Minion</div>
        </button>
        <button onClick={onAddBoss}>
          Add <div className="creature">Boss</div>
        </button>
        <button onClick={onClearAll}>
          <div className="defeat-all">Clear Rolls</div>
        </button>
      </div>
    </div>
  )
}
