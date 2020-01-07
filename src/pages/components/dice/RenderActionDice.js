import React from 'react'

const RenderActionDice = ({ rolls, type }) => {
  const display = rolls.map((roll, i) => {
    return [
      <div className="dice-roll" key={type + i}>
        <img style={{ height: '100%' }} src={`./images/dice/${roll}.png`} alt={roll}></img>
      </div>
    ]
  })
  return display
}

export default RenderActionDice
