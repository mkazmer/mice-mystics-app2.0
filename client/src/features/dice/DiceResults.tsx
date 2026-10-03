import type { ActionFace } from './dice'

export function MovementDice({ rolls }: { rolls: (number | null)[] }) {
  return rolls.map((roll, i) => (
    <div className="dice-roll" key={i}>
      {roll}
    </div>
  ))
}

export function ActionDice({ rolls }: { rolls: (ActionFace | null)[] }) {
  return rolls.map((roll, i) => (
    <div className="dice-roll" key={i}>
      <img style={{ height: '100%' }} src={`/images/dice/${roll ?? 'none'}.png`} alt={roll ?? 'not rolled'} />
    </div>
  ))
}
