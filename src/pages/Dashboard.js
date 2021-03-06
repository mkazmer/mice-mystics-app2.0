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

  updateRoll = (creature, type) => {
    let roll = []
    let isBrodie = creature.isBrodieChases || creature.isBrodiePounces
    if (type === 'movementRoll') {
      roll = creature.movementRoll.map(() => rollMovement())
    } else if (type === 'attackRoll') {
      roll = creature.attackRoll.map(() => rollAttack(creature.attack, isBrodie))
    } else if (type === 'defenseRoll') {
      roll = creature.defenseRoll.map(() => rollDefense(isBrodie, creature.isSkitterClak))
    }
    this.setState({
      activeCreatures: {
        ...this.state.activeCreatures,
        [`${creature.id}`]: {
          ...this.state.activeCreatures[`${creature.id}`],
          [`${type}`]: roll
        }
      }
    })
  }

  rollAllMovement = () => {
    const rolls = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      if (!prev[`${cur}`].isBrodiePounces) {
        prev[`${cur}`].movementRoll = prev[`${cur}`].movementRoll.map(() => rollMovement())
      }
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: rolls
    })
  }

  rollAllAttack = () => {
    const rolls = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      let type = prev[`${cur}`].attack
      let isBrodie = prev[`${cur}`].isBrodieChases || prev[`${cur}`].isBrodiePounces
      prev[`${cur}`].attackRoll = prev[`${cur}`].attackRoll.map(() => rollAttack(type, isBrodie))
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: rolls
    })
  }

  rollAllDefense = () => {
    const rolls = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      let isBrodie = prev[`${cur}`].isBrodieChases || prev[`${cur}`].isBrodiePounces
      let isSkitterClack = prev[`${cur}`].isSkitterClak
      prev[`${cur}`].defenseRoll = prev[`${cur}`].defenseRoll.map(() =>
        rollDefense(isBrodie, isSkitterClack)
      )
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: rolls
    })
  }

  clearIndividual = (creature, type) => {
    let roll = creature[`${type}`].map(() => (type === 'movementRoll' ? null : 'none'))

    this.setState({
      activeCreatures: {
        ...this.state.activeCreatures,
        [`${creature.id}`]: {
          ...this.state.activeCreatures[`${creature.id}`],
          [`${type}`]: roll
        }
      }
    })
  }

  clearAllMovement = () => {
    const allClear = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      if (!prev[`${cur}`].isBrodiePounces) {
        prev[`${cur}`].movementRoll = prev[`${cur}`].movementRoll.map(() => null)
      }
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: allClear
    })
  }

  clearAllAttack = () => {
    const allClear = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      prev[`${cur}`].attackRoll = prev[`${cur}`].attackRoll.map(() => 'none')
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: allClear
    })
  }

  clearAllDefense = () => {
    const allClear = Object.keys(this.state.activeCreatures).reduce((prev, cur) => {
      prev[`${cur}`].defenseRoll = prev[`${cur}`].defenseRoll.map(() => 'none')
      return prev
    }, this.state.activeCreatures)

    this.setState({
      activeCreatures: allClear
    })
  }

  clearAll = () => {
    this.clearAllMovement()
    this.clearAllAttack()
    this.clearAllDefense()
  }

  render() {
    return (
      <div className="Dashboard">
        <ButtonContainer
          openCloseCreatureEdit={this.openCloseCreatureEdit}
          rollAllMovement={this.rollAllMovement}
          rollAllAttack={this.rollAllAttack}
          rollAllDefense={this.rollAllDefense}
          clearAllMovement={this.clearAllMovement}
          clearAllAttack={this.clearAllAttack}
          clearAllDefense={this.clearAllDefense}
          clearAll={this.clearAll}
        />
        {this.state.addMinions ? (
          <MinionsAdd
            minionsMaster={this.props.minionsMaster}
            openCloseCreatureEdit={this.openCloseCreatureEdit}
            addMinionsToDash={this.addMinionsToDash}
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
                updateRoll={this.updateRoll}
                clearIndividual={this.clearIndividual}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Dashboard)
