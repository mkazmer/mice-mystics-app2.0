import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './Nav'
import AppContainer from './AppContainer'
import Footer from './Footer'

import './style/App.scss'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <AppContainer />
        <Footer />
      </Router>
    </div>
  )
}

export default App
