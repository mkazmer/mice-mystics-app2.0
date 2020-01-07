import React from 'react'

import './style/Footer.scss'

const Footer = () => {
  return (
    <div className="Footer">
      <a href="https://github.com/mkazmer/mice-mystics-app2.0">
        <img src="./images/github.png" alt="Link to Github" />
      </a>
      <a href="https://mikekazmer.com/">
        <img src="./images/webbasser.png" alt="Link to mikekazer.com" />
      </a>
      <a href="https://www.plaidhatgames.com/games/mice-and-mystics">
        <img src="./images/diceIcon.png" alt="Link to Plaid Hat Game's Mice &amp; Mystics page" />
      </a>
    </div>
  )
}

export default Footer
