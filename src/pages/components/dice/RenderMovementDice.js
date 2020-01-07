import React from 'react'

const RenderMoveDice = ({ rolls, isPounce }) => {
  if (!isPounce) {
    const display = rolls.map((roll, i) => {
      return [
        <div className="dice-roll" key={'move-' + i}>
          {roll}
        </div>
      ]
    })
    return display
  } else return []
}

export default RenderMoveDice
