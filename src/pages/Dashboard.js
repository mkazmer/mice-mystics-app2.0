import React, { Component } from 'react'

import ButtonContainer from './components/dashboard/ButtonContainer'
import CreatureCard from './components/dashboard/CreatureCard'
import './Dashboard.scss'

let minionId = 0
let bossId = 0

class Dashboard extends Component {
  state = {
    activeCreatures: {
      'minion-1': {
        id: 'minion-1',
        name: 'Roach',
        image: 'roach.jpg',
        maxNum: 8,
        health: 1,
        attack: 'melee',
        movementRoll: [2],
        attackRoll: ['sword', 'blank', 'sword', 'blank'],
        defenseRoll: ['blank'],
        abilities: [
          {
            title: 'Steal',
            text:
              "When a Roach wounds a mouse, instead of placing wound markers, remove 1 cheese from that mouse's stash for each wound inflicted. If that mouse has no cheese, place wound markers as usual."
          }
        ],
        canBeGreedy: true,
        isGreedy: false
      },
      'minion-2': {
        id: 'minion-2',
        name: 'Roach',
        image: 'roach.jpg',
        maxNum: 8,
        health: 1,
        attack: 'melee',
        movementRoll: [null],
        attackRoll: ['none', 'none'],
        defenseRoll: ['none'],
        abilities: [
          {
            title: 'Steal',
            text:
              "When a Roach wounds a mouse, instead of placing wound markers, remove 1 cheese from that mouse's stash for each wound inflicted. If that mouse has no cheese, place wound markers as usual."
          }
        ],
        canBeGreedy: true,
        isGreedy: false
      },
      'minion-3': {
        id: 'minion-34',
        name: 'Elite Rat Warrior',
        image: 'elite_rat.jpg',
        maxNum: 5,
        health: 1,
        attack: 'ranged',
        movementRoll: [null],
        attackRoll: ['none', 'none', 'none'],
        defenseRoll: ['none', 'none'],
        abilities: [
          {
            title: 'Aggressive',
            text:
              'After taking a turn with this Rat Warrior card, switch this card with the one directly above it on theinitiative track (if any).'
          }
        ],
        canBeGreedy: false
      },
      'minion-4': {
        id: 'minion-4',
        name: 'Rat Warrior',
        image: 'rat_warrior.jpg',
        maxNum: 6,
        health: 1,
        attack: 'melee',
        movementRoll: [null],
        attackRoll: ['none', 'none'],
        defenseRoll: ['none', 'none'],
        abilities: [
          {
            title: 'Aggressive',
            text:
              'After taking a turn with this Rat Warrior card, switch this card with the one directly above it on theinitiative track (if any).'
          }
        ],
        canBeGreedy: false
      },
      'minion-5': {
        id: 'minion-5',
        name: 'Rat Warrior',
        image: 'rat_warrior.jpg',
        maxNum: 6,
        health: 1,
        attack: 'melee',
        movementRoll: [null],
        attackRoll: ['none', 'none'],
        defenseRoll: ['none', 'none'],
        abilities: [
          {
            title: 'Aggressive',
            text:
              'After taking a turn with this Rat Warrior card, switch this card with the one directly above it on theinitiative track (if any).'
          }
        ],
        canBeGreedy: false
      },
      'boss-1': {
        id: 'boss-1A',
        name: 'Skitter-Clak',
        image: 'skitter_clak.jpg',
        health: 3,
        attack: 'melee',
        movementRoll: [null],
        attackRoll: ['none', 'none'],
        defenseRoll: ['none', 'none'],
        abilities: [
          {
            title: 'Constrict',
            text: 'Mice cannot roll to defend against Skitter-Clak'
          },
          {
            title: 'Carapace',
            text:
              'When Skitter-Clak rolls defense, all shields with success star rolled count as 2 successfull blocks'
          }
        ]
      }
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="Dashboard">
        <ButtonContainer />
        <div className="creature-container">
          {Object.keys(this.state.activeCreatures).map(cId => {
            const creature = this.state.activeCreatures[cId]
            return <CreatureCard key={cId} creature={creature} />
          })}
        </div>
      </div>
    )
  }
}

export default Dashboard
