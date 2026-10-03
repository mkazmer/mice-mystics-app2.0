import type { Ability as AbilityType } from './creatures'
import './Ability.scss'

export default function Ability({ ability }: { ability: AbilityType }) {
  return (
    <h5 className="Ability">
      {ability.title} <div className="ability-description">{ability.text}</div>
    </h5>
  )
}
