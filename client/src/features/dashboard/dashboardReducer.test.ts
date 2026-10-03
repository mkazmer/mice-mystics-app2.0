import { describe, expect, it } from 'vitest'
import { dashboardReducer, initialDashboardState, rollFor } from './dashboardReducer'

describe('dashboardReducer', () => {
  it('adds minions with sequential numbers across adds', () => {
    let state = dashboardReducer(initialDashboardState, { type: 'addMinions', counts: { roach: 2 } })
    state = dashboardReducer(state, { type: 'addMinions', counts: { spider: 1 } })

    expect(state.creatures.map(c => [c.name, c.label])).toEqual([
      ['Roach', '#1'],
      ['Roach', '#2'],
      ['Spider', '#3'],
    ])
    expect(state.creatures[0].rolls).toEqual({ movement: [null], attack: [null, null], defense: [null] })
  })

  it('adds one card per boss initiative card', () => {
    const state = dashboardReducer(initialDashboardState, { type: 'addBoss', bossId: 'brodie' })

    expect(state.creatures.map(c => c.key)).toEqual(['brodie_chases-1', 'brodie_pounces-1'])
    expect(state.creatures[1].rolls.movement).toEqual([]) // Brodie Pounces doesn't move by roll
  })

  it('removes a creature by key without touching the others', () => {
    let state = dashboardReducer(initialDashboardState, { type: 'addMinions', counts: { roach: 2 } })
    state = dashboardReducer(state, { type: 'remove', key: 'minion-1' })

    expect(state.creatures.map(c => c.key)).toEqual(['minion-2'])
  })

  it('sets and clears rolls immutably', () => {
    const start = dashboardReducer(initialDashboardState, { type: 'addMinions', counts: { roach: 1 } })
    const creature = start.creatures[0]
    const rolled = dashboardReducer(start, {
      type: 'setRolls',
      kind: 'attack',
      rolls: { [creature.key]: rollFor(creature, 'attack') },
    })

    expect(rolled.creatures[0].rolls.attack.every(face => face !== null)).toBe(true)
    expect(start.creatures[0].rolls.attack).toEqual([null, null]) // previous state untouched

    const cleared = dashboardReducer(rolled, { type: 'clearRolls', kind: 'all' })
    expect(cleared.creatures[0].rolls.attack).toEqual([null, null])
  })
})
