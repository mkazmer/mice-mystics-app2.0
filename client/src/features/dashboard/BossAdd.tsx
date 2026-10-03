import { bosses } from './creatures'
import './MinionsAdd.scss'

type Props = {
  onAdd: (bossId: string) => void
  onClose: () => void
}

// Reuses the MinionsAdd modal styles
export default function BossAdd({ onAdd, onClose }: Props) {
  return (
    <div className="MinionsAdd">
      <div className="container">
        <div className="minions-container">
          {bosses.map(b => (
            <div className="minion" key={b.id}>
              <img className="minion-img" alt={b.name} src={`/images/creatures/${b.image}`} />
              <div className="minion-info">
                <div className="minion-name">{b.name}</div>
                <div className="minion-qty">
                  <div className="inc-dec-buttons">
                    <button
                      className="add-button"
                      onClick={() => {
                        onAdd(b.id)
                        onClose()
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
