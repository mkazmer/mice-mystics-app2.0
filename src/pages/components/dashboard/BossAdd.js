import React, { useState } from 'react'

import './BossAdd.scss'

const initializeCount = bossMaster => {
  const count = {}
  Object.keys(bossMaster).forEach(minId => {
    const id = minId
    const initiativeCards = bossMaster[minId].initiativeCards.reduce((prev, cur) => {
      return { ...prev, [`${cur.name}`]: cur }
    }, {})

    count[id] = {
      id: minId,
      name: bossMaster[minId].name,
      image: bossMaster[minId].image,
      initiativeCards: initiativeCards
    }
  })
  return count
}

const BossAdd = ({ bossMaster, openCloseCreatureEdit, addCreaturesToDash, activeCreatures }) => {
  const [creatureCount] = useState(initializeCount(bossMaster))

  return (
    <div className="MinionsAdd">
      <div className="container">
        <div className="minions-container">
          {Object.keys(creatureCount).map(bossId => {
            const b = creatureCount[bossId]
            return (
              <div className="minion" key={bossId}>
                <img
                  className="minion-img"
                  alt={b.image}
                  src={`/images/creatures/${b.image}`}
                ></img>
                <div className="minion-info">
                  <div className="minion-name">{b.name}</div>
                  <div className="minion-qty">
                    <div className="inc-dec-buttons">
                      <button className="add-button">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="button-container">
          <button
            onClick={() => {
              openCloseCreatureEdit('addBoss', false)
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
