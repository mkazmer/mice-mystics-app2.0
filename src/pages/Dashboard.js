import React, { Component } from 'react'
import { connect } from 'react-redux'

import ButtonContainer from './components/dashboard/ButtonContainer'
import MinionsAdd from './components/dashboard/MinionsAdd'
import BossAdd from './components/dashboard/BossAdd'
import CreatureCard from './components/dashboard/CreatureCard'
import { rollMovement, rollAttack, rollDefense } from './components/dice/CalculateDice'
import './Dashboard.scss'

let minionId = 0
let bossId = 0

class Dashboard extends Component {
  state = {
    addMinions: false,
    addBoss: false,
    activeCreatures: {}
  }

  openCloseCreatureEdit = (creatureType, openClose) => {
    this.setState({
      [`${creatureType}`]: openClose
    })
  }

  addMinionsToDash = toAdd => {
    const creatures = Object.values(toAdd).reduce((prev, cur) => {
      for (let i = 0; i < cur.qty; i++) {
        minionId++
        prev[`minion-${minionId}`] = {
          ...this.props.minionsMaster[`${cur.id}`],
          id: `minion-${minionId}`
        }
      }
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: creatures
    })
  }

  addBossToDash = toAdd => {
    bossId++
    Object.values(toAdd.initiativeCards).reduce((prev, cur, i) => {
      prev[`${cur.id}-${bossId}`] = {
        ...this.props.bossMaster[`${toAdd.id}`].initiativeCards[i],
        id: `${cur.id}-${bossId}`,
        isBoss: true
      }
      return prev
    }, this.state.activeCreatures)
  }

  removeCreature = id => {
    delete this.state.activeCreatures[id]
    this.setState(this.state)
  }

  updateMovement = creature => {
    const roll = creature.movementRoll.map(() => rollMovement())
    this.setState({
      activeCreatures: {
        ...this.state.activeCreatures,
        [`${creature.id}`]: {
          ...this.state.activeCreatures[`${creature.id}`],
          movementRoll: roll
        }
      }
    })
  }

  rollAllMovement = () => {
    const rolls = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      prev[`${cur}`].movementRoll = prev[`${cur}`].movementRoll.map(() => rollMovement())
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: rolls
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <ButtonContainer
          openCloseCreatureEdit={this.openCloseCreatureEdit}
          rollAllMovement={this.rollAllMovement}
        />
        {this.state.addMinions ? (
          <MinionsAdd
            minionsMaster={this.props.minionsMaster}
            openCloseCreatureEdit={this.openCloseCreatureEdit}
            addMinionsToDash={this.addMinionsToDash}
            removeCreature={this.removeCreature}
          />
        ) : null}
        {this.state.addBoss ? (
          <BossAdd
            bossMaster={this.props.bossMaster}
            openCloseCreatureEdit={this.openCloseCreatureEdit}
            addBossToDash={this.addBossToDash}
          />
        ) : null}
        <div className="creature-container">
          {Object.keys(this.state.activeCreatures).map(cId => {
            const creature = this.state.activeCreatures[cId]
            return (
              <CreatureCard
                key={cId}
                creature={creature}
                removeCreature={this.removeCreature}
                updateMovement={this.updateMovement}
              />
            )
          })}
        </div>
        <button onClick={() => console.log(this.state)}>Press</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Dashboard)
