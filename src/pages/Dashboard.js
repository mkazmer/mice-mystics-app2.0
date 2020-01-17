import React, { Component } from 'react'
import { connect } from 'react-redux'

import ButtonContainer from './components/dashboard/ButtonContainer'
import MinionsAdd from './components/dashboard/MinionsAdd'
import BossAdd from './components/dashboard/BossAdd'
import CreatureCard from './components/dashboard/CreatureCard'
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

  addCreaturesToDash = (toAdd, type) => {
    const creatures = Object.values(toAdd).reduce((prev, cur) => {
      for (let i = 0; i < cur.qty; i++) {
        type === 'minion' ? minionId++ : bossId++
        let count = 0
        type === 'minion' ? (count = minionId) : (count = bossId)
        prev[`${type}-${count}`] = this.props.minionsMaster[`${cur.id}`]
        prev[`${type}-${count}`].id = `${type}-${count}`
      }
      return prev
    }, this.state.activeCreatures)
    this.setState({
      activeCreatures: creatures
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <ButtonContainer openCloseCreatureEdit={this.openCloseCreatureEdit} />
        {this.state.addMinions ? (
          <MinionsAdd
            minionsMaster={this.props.minionsMaster}
            openCloseCreatureEdit={this.openCloseCreatureEdit}
            addCreaturesToDash={this.addCreaturesToDash}
          />
        ) : null}
        {this.state.addBoss ? (
          <BossAdd
            minionsMaster={this.props.bossMaster}
            openCloseCreatureEdit={this.openCloseCreatureEdit}
            addCreaturesToDash={this.addCreaturesToDash}
          />
        ) : null}
        <div className="creature-container">
          {Object.keys(this.state.activeCreatures).map(cId => {
            const creature = this.state.activeCreatures[cId]
            return <CreatureCard key={cId} creature={creature} />
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
