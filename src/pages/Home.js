import React from 'react'

import './Home.scss'

const Home = () => {
  return (
    <div className="Home">
      <div className="header">
        <h1>{'Mice & Mystics App'}</h1>
        <h4>Created by Mike Kazmer</h4>
        <p>
          This application is meant to be used with the board game Mice and Mystics.  It allows the user to calcuate minion and boss rolls more quickly and easily.
        </p>
      </div>
      <div className="dashboard-details">
        <h2>Dashboard</h2>
        <figure>
          <div>
            <ul>
              <li>
                <h5>1 - Creature Name</h5> For minions this will be the creature type, while bosses
                will have their individual name.
              </li>
              <li>
                <h5>2 - Remove Creature</h5> Click this button to remove that individual creature
                card after they have been defeated.
              </li>
              <li>
                <h5>3 - Health Markers</h5> These markers will indicate the number of hits required
                to defeat them. To easily keep track of hits to each creature, you can click on the
                heart to toggle it between Red and Grey.
              </li>
              <li>
                <h5>4 - Inidividual Minion Count</h5>
                {
                  '(Minions only) will have a unique number to differentiate them from other minions of the same type.'
                }
              </li>
              <li>
                <h5>5 - Creature's Abilities</h5>
              </li>
              <li>
                <h5>6 - Movement Roll Result</h5>
              </li>
              <li>
                <h5>7 - Attack Roll Result</h5>
              </li>
              <li>
                <h5>8 - Defense Roll Result</h5>
              </li>
            </ul>
          </div>
          <img
            src="./images/about/creature_card_example.png"
            alt="Screenshot of Spider Creature Card"
          />
          <figcaption>Minion Creature Card - Spider </figcaption>
        </figure>
      </div>
      <div className="campaign-details">
        <h2>Campaigns</h2>
        <p>Under Construction....</p>
      </div>
    </div>
  )
}

export default Home
