import React, { useState } from 'react'

import './MinionsAdd.scss'

const initializeCount = minionsMaster => {
  const count = {}
  Object.keys(minionsMaster).forEach(minId => {
    const id = minId
    count[id] = {
      id: minId,
      name: minionsMaster[minId].name,
      image: minionsMaster[minId].image,
      qty: 0,
      maxNum: minionsMaster[minId].maxNum
    }
  })
  return count
}

const MinionsAdd = ({ minionsMaster, openCloseCreatureEdit, addCreaturesToDash }) => {
  const [creatureCount, updateCount] = useState(initializeCount(minionsMaster))

  const incrementQyt = (id, max) => {
    if (creatureCount[`${id}`].qty < max) {
      updateCount({
        ...creatureCount,
        [`${id}`]: {
          ...creatureCount[`${id}`],
          qty: creatureCount[`${id}`].qty + 1
        }
      })
    }
  }

  const decrementQyt = id => {
    if (creatureCount[`${id}`].qty > 0) {
      updateCount({
        ...creatureCount,
        [`${id}`]: {
          ...creatureCount[`${id}`],
          qty: creatureCount[`${id}`].qty - 1
        }
      })
    }
  }

  return (
    <div className="MinionsAdd">
      <div className="container">
        <div className="minions-container">
          {Object.keys(creatureCount).map(minId => {
            const m = creatureCount[minId]
            return (
              <div className="minion" key={minId}>
                <img
                  className="minion-img"
                  alt={m.image}
                  src={`/images/creatures/${m.image}`}
                ></img>
                <div className="minion-info">
                  <div className="minion-name">{m.name}</div>
                  <div className="minion-qty">
                    <div className="inc-dec-buttons">
                      <button
                        className="increment-minion"
                        onClick={() => {
                          incrementQyt(minId, m.maxNum)
                        }}
                      >
                        +
                      </button>
                      <button
                        className="decrement-minion"
                        onClick={() => {
                          decrementQyt(minId)
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className="qty-value">{m.qty}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="button-container">
          <button
            onClick={() => {
              addCreaturesToDash(creatureCount, 'minion')
              openCloseCreatureEdit('addMinions', false)
            }}
          >
            Add Minions
          </button>
          <button
            onClick={() => {
              openCloseCreatureEdit('addMinions', false)
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default MinionsAdd
