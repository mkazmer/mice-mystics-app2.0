import React, { useState } from 'react'

import './BossAdd.scss'

const initializeCount = bossMaster => {
  const count = {}
  console.log(bossMaster)
  Object.keys(bossMaster).forEach(minId => {
    const id = minId
    count[id] = {
      id: minId,
      name: bossMaster[minId].name,
      image: bossMaster[minId].image,
      qty: 0,
      maxNum: bossMaster[minId].maxNum
    }
  })
  return count
}

const BossAdd = ({ bossMaster, openCloseCreatureEdit, addCreaturesToDash, activeCreatures }) => {
  const [creatureCount, updateCount] = useState(initializeCount(bossMaster))

  return (
    <div className="MinionsAdd">
      <div className="minions-container">
        {Object.keys(creatureCount).map(minId => {
          const m = creatureCount[minId]
          return (
            <div className="minion" key={minId}>
              <img className="minion-img" alt={m.image} src={`/images/creatures/${m.image}`}></img>
              <div className="minion-info">
                <div className="minion-name">{m.name}</div>
                <div className="minion-qty">
                  <div className="inc-dec-buttons">
                    <button className="add-button">Add</button>
                  </div>
                  <div className="qty-value">{m.qty}</div>
                </div>
              </div>
            </div>
          )
        })}
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

export default BossAdd
