import React from 'react'

import './ButtonContainer.scss'

const ButtonContainer = ({
  openCloseCreatureEdit,
  rollAllMovement,
  rollAllAttack,
  rollAllDefense
}) => {
  return (
    <div className="ButtonContainer">
      <div className="buttons rolls">
        <button onClick={() => rollAllMovement()}>
          Roll All <div className="movement">Movement</div>
        </button>
        <button onClick={() => rollAllAttack()}>
          Roll All <div className="attack">Attack</div>
        </button>
        <button onClick={() => rollAllDefense()}>
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
        <button>
          <div className="defeat-all">Clear Rolls</div>
        </button>
      </div>
    </div>
  )
}

export default ButtonContainer
