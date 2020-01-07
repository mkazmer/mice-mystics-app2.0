import React, { Component } from 'react'

import ButtonContainer from './components/dashboard/ButtonContainer'
import CreatureCard from './components/dashboard/CreatureCard'
import './Dashboard.scss'

let creatureId = 0

class Dashboard extends Component {
  state = {
    activeCreatures: {
      'roach-1': {
        id: 'roach-1',
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
      'roach-2': {
        id: 'roach-2',
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
      'roach-3': {
        id: 'roach-1',
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
      'roach-4': {
        id: 'roach-2',
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
      'roach-5': {
        id: 'roach-1',
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
      'roach-6': {
        id: 'roach-2',
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
      }
    }
  }

  render() {
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
