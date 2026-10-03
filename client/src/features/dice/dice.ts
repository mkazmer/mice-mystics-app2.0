export type AttackType = 'melee' | 'ranged'
export type ActionFace = 'cheese' | 'bow' | 'sword' | 'shield' | 'double-shield' | 'blank'

export type RollOptions = {
  canRollCheese?: boolean // false for Brodie: his cheese faces count as blanks
  doubleShield?: boolean // Skitter-Clak's Carapace: star shields block twice
}

// Injectable so tests can force specific faces
export type RandomFn = () => number

const d6 = (random: RandomFn) => Math.floor(random() * 6)

// Movement roll (returns 1-3)
export const rollMovement = (random: RandomFn = Math.random) => Math.floor(random() * 3) + 1

// Ranged & melee attack roll (returns cheese, bow, sword or blank)
export const rollAttack = (
  type: AttackType,
  { canRollCheese = true }: RollOptions = {},
  random: RandomFn = Math.random,
): ActionFace => {
  const roll = d6(random)

  if (roll === 0) return canRollCheese ? 'cheese' : 'blank'
  if (type === 'ranged' && roll <= 2) return 'bow'
  if (type === 'melee' && roll <= 3) return 'sword'
  return 'blank'
}

// Defense roll (returns cheese, shield, blank, or double-shield for Skitter-Clak)
export const rollDefense = (
  { canRollCheese = true, doubleShield = false }: RollOptions = {},
  random: RandomFn = Math.random,
): ActionFace => {
  const roll = d6(random)

  if (roll === 0) return canRollCheese ? 'cheese' : 'blank'
  if (roll === 1) return doubleShield ? 'double-shield' : 'shield'
  if (roll === 2) return 'shield'
  return 'blank'
}
