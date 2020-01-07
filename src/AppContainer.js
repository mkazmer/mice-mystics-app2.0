import React from 'react'
import { Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import './style/AppContainer.scss'

const AppContainer = () => {
  return (
    <div className="AppContainer">
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/campaigns" component={Campaigns} />
    </div>
  )
}

export default AppContainer
