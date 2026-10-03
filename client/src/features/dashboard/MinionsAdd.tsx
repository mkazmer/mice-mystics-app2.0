import { useState } from 'react'
import { minions } from './creatures'
import './MinionsAdd.scss'

type Props = {
  onAdd: (counts: Record<string, number>) => void
  onClose: () => void
}

export default function MinionsAdd({ onAdd, onClose }: Props) {
  const [counts, setCounts] = useState<Record<string, number>>({})

  const change = (id: string, delta: number, max: number) => {
    const next = Math.min(max, Math.max(0, (counts[id] ?? 0) + delta))
    setCounts({ ...counts, [id]: next })
  }

  return (
    <div className="MinionsAdd">
      <div className="container">
        <div className="minions-container">
          {minions.map(m => (
            <div className="minion" key={m.id}>
              <img className="minion-img" alt={m.name} src={`/images/creatures/${m.image}`} />
              <div className="minion-info">
                <div className="minion-name">{m.name}</div>
                <div className="minion-qty">
                  <div className="inc-dec-buttons">
                    <button aria-label={`Add a ${m.name}`} onClick={() => change(m.id, 1, m.maxNum)}>
                      +
                    </button>
                    <button aria-label={`Remove a ${m.name}`} onClick={() => change(m.id, -1, m.maxNum)}>
                      -
                    </button>
                  </div>
                  <div className="qty-value">{counts[m.id] ?? 0}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button
            onClick={() => {
              onAdd(counts)
              onClose()
            }}
          >
            Add Minions
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
