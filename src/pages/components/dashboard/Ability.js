import React from 'react'

import './Ability.scss'

const Ability = props => {
  return (
    <h5 className="Ability">
      {props.ability.title} <div className="ability-description">{props.ability.text}</div>
    </h5>
  )
}

export default Ability
