//Calculates Basic Movement Roll (returns 1-3)
export const rollMovement = () => {
  return Math.floor(Math.random() * 3 + 1)
}

//Calculates Ranged & Melee Attack Roll (returns cheese, bow, sword or blank)
export const rollAttack = type => {
  const roll = Math.floor(Math.random() * 6)

  if (roll === 0) return 'cheese'

  if ((roll === 1 || roll === 2) && type === 'ranged') {
    return 'bow'
  } else if (roll >= 1 && roll <= 3 && type === 'melee') {
    return 'sword'
  }
  return 'blank'
}

//Calculates Defense Roll (returns cheese, shield, blank or possible double-shield if rolling for Skitter-Clak)
export const rollDefense = isSkitterClak => {
  const roll = Math.floor(Math.random() * 6)

  if (roll === 0) return 'cheese'

  if (roll === 1 && isSkitterClak) {
    return 'double-shield'
  } else if (roll === 1 || roll === 2) {
    return 'shield'
  }

  return 'blank'
}
