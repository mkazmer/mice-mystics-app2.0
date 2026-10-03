import { rollAttack, rollDefense, rollMovement, type ActionFace } from '../dice/dice'
import { bosses, minions, type CreatureStats } from './creatures'

export type RollKind = 'movement' | 'attack' | 'defense'

// null = not rolled yet
export type Rolls = {
  movement: (number | null)[]
  attack: (ActionFace | null)[]
  defense: (ActionFace | null)[]
}

export type ActiveCreature = CreatureStats & {
  key: string
  label: string | null // "#3" for minions so players can tell duplicates apart
  isBoss: boolean
  rolls: Rolls
}

export type DashboardState = {
  creatures: ActiveCreature[]
  nextMinionNumber: number
  nextBossNumber: number
}

export type DashboardAction =
  | { type: 'addMinions'; counts: Record<string, number> }
  | { type: 'addBoss'; bossId: string }
  | { type: 'remove'; key: string }
  | { type: 'setRolls'; kind: RollKind; rolls: Record<string, Rolls[RollKind]> }
  | { type: 'clearRolls'; kind: RollKind | 'all'; key?: string }

export const initialDashboardState: DashboardState = {
  creatures: [],
  nextMinionNumber: 1,
  nextBossNumber: 1,
}

const emptyRolls = (stats: CreatureStats): Rolls => ({
  movement: Array(stats.movementDice).fill(null),
  attack: Array(stats.attackDice).fill(null),
  defense: Array(stats.defenseDice).fill(null),
})

// Kept out of the reducer so the reducer stays pure (StrictMode runs reducers twice in dev)
export const rollFor = (creature: ActiveCreature, kind: RollKind): Rolls[RollKind] => {
  switch (kind) {
    case 'movement':
      return creature.rolls.movement.map(() => rollMovement())
    case 'attack':
      return creature.rolls.attack.map(() => rollAttack(creature.attack, creature))
    case 'defense':
      return creature.rolls.defense.map(() => rollDefense(creature))
  }
}

export function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'addMinions': {
      let n = state.nextMinionNumber
      const added: ActiveCreature[] = []
      for (const minion of minions) {
        const qty = action.counts[minion.id] ?? 0
        for (let i = 0; i < qty; i++, n++) {
          const { maxNum: _maxNum, id: _id, ...stats } = minion
          added.push({
            ...stats,
            key: `minion-${n}`,
            label: `#${n}`,
            isBoss: false,
            rolls: emptyRolls(stats),
          })
        }
      }
      return { ...state, creatures: [...state.creatures, ...added], nextMinionNumber: n }
    }

    case 'addBoss': {
      const boss = bosses.find(b => b.id === action.bossId)
      if (!boss) return state
      const n = state.nextBossNumber
      const added = boss.initiativeCards.map(({ id, ...stats }) => ({
        ...stats,
        key: `${id}-${n}`,
        label: null,
        isBoss: true,
        rolls: emptyRolls(stats),
      }))
      return { ...state, creatures: [...state.creatures, ...added], nextBossNumber: n + 1 }
    }

    case 'remove':
      return { ...state, creatures: state.creatures.filter(c => c.key !== action.key) }

    case 'setRolls':
      return {
        ...state,
        creatures: state.creatures.map(c =>
          action.rolls[c.key] ? { ...c, rolls: { ...c.rolls, [action.kind]: action.rolls[c.key] } } : c,
        ),
      }

    case 'clearRolls': {
      const kinds: RollKind[] = action.kind === 'all' ? ['movement', 'attack', 'defense'] : [action.kind]
      return {
        ...state,
        creatures: state.creatures.map(c => {
          if (action.key && c.key !== action.key) return c
          const rolls = { ...c.rolls }
          for (const kind of kinds) rolls[kind] = rolls[kind].map(() => null)
          return { ...c, rolls }
        }),
      }
    }
  }
}
