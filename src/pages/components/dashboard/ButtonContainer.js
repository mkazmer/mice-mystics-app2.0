import React from 'react'

import './ButtonContainer.scss'

const ButtonContainer = () => {
  return (
    <div className="ButtonContainer">
      <div className="buttons rolls">
        <button>
          Roll All <div className="movement">Movement</div>
        </button>
        <button>
          Roll All <div className="attack">Attack</div>
        </button>
        <button>
          Roll All <div className="defense">Defense</div>
        </button>
      </div>
      <div className="buttons adds">
        <button>
          Add <div className="creature">Minion</div>
        </button>
        <button>
          Add <div className="creature">Boss</div>
        </button>
        <button>
          <div className="defeat-all">Defeat All</div>
        </button>
      </div>
    </div>
  )
}

export default ButtonContainer
