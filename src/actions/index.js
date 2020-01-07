export const addCreatures = creatures => {
  return {
    type: 'ADD_CREATURES',
    payload: creatures
  }
}

export const removeCreatures = creatures => {
  return {
    type: 'REMOVE_CREATURES',
    payload: creatures
  }
}
