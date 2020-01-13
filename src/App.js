import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Nav from './Nav'
import AppContainer from './AppContainer'
import Footer from './Footer'
import reducers from './reducers'

import './style/App.scss'

const App = () => {
  return (
    <div className="App">
      <Provider store={createStore(reducers)}>
        <Router>
          <Nav />
          <AppContainer />
          <Footer />
        </Router>
      </Provider>
    </div>
  )
}

export default App
