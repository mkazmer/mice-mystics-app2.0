import { describe, expect, it } from 'vitest'
import { rollAttack, rollDefense, rollMovement } from './dice'

// Returns a random() value that lands on the given d6 face (0-5)
const face = (n: number) => () => (n + 0.5) / 6

describe('rollMovement', () => {
  it('returns 1-3', () => {
    expect(rollMovement(() => 0)).toBe(1)
    expect(rollMovement(() => 0.5)).toBe(2)
    expect(rollMovement(() => 0.999)).toBe(3)
  })
})

describe('rollAttack', () => {
  it('maps melee faces: 1 cheese, 3 swords, 2 blanks', () => {
    const faces = [0, 1, 2, 3, 4, 5].map(n => rollAttack('melee', {}, face(n)))
    expect(faces).toEqual(['cheese', 'sword', 'sword', 'sword', 'blank', 'blank'])
  })

  it('maps ranged faces: 1 cheese, 2 bows, 3 blanks', () => {
    const faces = [0, 1, 2, 3, 4, 5].map(n => rollAttack('ranged', {}, face(n)))
    expect(faces).toEqual(['cheese', 'bow', 'bow', 'blank', 'blank', 'blank'])
  })

  it('turns cheese into a blank when the creature cannot roll cheese', () => {
    expect(rollAttack('melee', { canRollCheese: false }, face(0))).toBe('blank')
  })
})

describe('rollDefense', () => {
  it('maps faces: 1 cheese, 2 shields, 3 blanks', () => {
    const faces = [0, 1, 2, 3, 4, 5].map(n => rollDefense({}, face(n)))
    expect(faces).toEqual(['cheese', 'shield', 'shield', 'blank', 'blank', 'blank'])
  })

  it('rolls a double shield on the star shield for Skitter-Clak', () => {
    expect(rollDefense({ doubleShield: true }, face(1))).toBe('double-shield')
    expect(rollDefense({ doubleShield: true }, face(2))).toBe('shield')
  })
})
