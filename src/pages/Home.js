import React from 'react'

import './Home.scss'

const Home = () => {
  return (
    <div className="Home">
      <div>
        <h1>{'Mice & Mystics App'}</h1>
        <h4>Created by Mike Kazmer</h4>
        <p>
          I created this application as a way to calcuate minion and boss rolls quickly and easily.
        </p>
      </div>
      <div>
        <h2>Dashboard</h2>
        <figure>
          <div>{'1 - \t 2 -'}</div>
          <img
            src="./images/about/creature_card_example.png"
            alt="Screenshot of Spider Creature Card"
          />
          <figcaption>Spider Minion Creature Card</figcaption>
        </figure>
      </div>
      <div>
        <h2>Campaigns</h2>
        <p>Under Construction....</p>
      </div>
    </div>
  )
}

export default Home
