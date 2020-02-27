import React from 'react'

import './ButtonContainer.scss'

const ButtonContainer = ({
  openCloseCreatureEdit,
  rollAllMovement,
  rollAllAttack,
  rollAllDefense,
  clearAllMovement,
  clearAllAttack,
  clearAllDefense,
  clearAll
}) => {
  return (
    <div className="ButtonContainer">
      <div className="buttons rolls">
        <button
          onClick={() => {
            clearAllMovement()
            setTimeout(() => {
              rollAllMovement()
            }, 200)
          }}
        >
          Roll All <div className="movement">Movement</div>
        </button>
        <button
          onClick={() => {
            clearAllAttack()
            setTimeout(() => {
              rollAllAttack()
            }, 200)
          }}
        >
          Roll All <div className="attack">Attack</div>
        </button>
        <button
          onClick={() => {
            clearAllDefense()
            setTimeout(() => {
              rollAllDefense()
            }, 200)
          }}
        >
          Roll All <div className="defense">Defense</div>
        </button>
      </div>
      <div className="buttons adds">
        <button
          onClick={() => {
            openCloseCreatureEdit('addMinions', true)
          }}
        >
          Add <div className="creature">Minion</div>
        </button>
        <button
          onClick={() => {
            openCloseCreatureEdit('addBoss', true)
          }}
        >
          Add <div className="creature">Boss</div>
        </button>
        <button onClick={() => clearAll()}>
          <div className="defeat-all">Clear Rolls</div>
        </button>
      </div>
    </div>
  )
}

export default ButtonContainer
