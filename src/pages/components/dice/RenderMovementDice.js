import React from 'react'

const RenderMoveDice = ({ rolls }) => {
  const display = rolls.map((roll, i) => {
    return [
      <div className="dice-roll" key={'move-' + i}>
        {roll}
      </div>
    ]
  })
  return display
}

export default RenderMoveDice
