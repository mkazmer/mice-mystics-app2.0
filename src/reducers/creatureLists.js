//MASTER LISTS

//Minions
export const minionsMasterList = () => {
  return [
    {
      name: 'Roach',
      image: 'roach.jpg',
      maxNum: 8,
      health: 1,
      attack: 'melee',
      movementRoll: [null],
      attackRoll: ['none', 'none'],
      defenseRoll: ['none'],
      abilities: [
        {
          title: 'Steal',
          text:
            "When a Roach wounds a mouse, instead of placing wound markers, remove 1 cheese from that mouse's stash for each wound inflicted. If that mouse has no cheese, place wound markers as usual."
        }
      ],
      canBeGreedy: true,
      isGreedy: false
    },
    {
      name: 'Rat Warrior',
      image: 'rat_warrior.jpg',
      maxNum: 6,
      health: 1,
      attack: 'melee',
      movementRoll: [null],
      attackRoll: ['none', 'none'],
      defenseRoll: ['none', 'none'],
      abilities: [
        {
          title: 'Aggressive',
          text:
            'After taking a turn with this Rat Warrior card, switch this card with the one directly above it on theinitiative track (if any).'
        }
      ],
      canBeGreedy: false
    },
    {
      name: 'Elite Rat Warrior',
      image: 'elite_rat.jpg',
      maxNum: 5,
      health: 1,
      attack: 'ranged',
      movementRoll: [null],
      attackRoll: ['none', 'none', 'none'],
      defenseRoll: ['none', 'none'],
      abilities: [
        {
          title: 'Aggressive',
          text:
            'After taking a turn with this Rat Warrior card, switch this card with the one directly above it on theinitiative track (if any).'
        }
      ],
      canBeGreedy: false
    },
    {
      name: 'Spider',
      image: 'spider.jpg',
      maxNum: 1,
      health: 3,
      attack: 'melee',
      movementRoll: [null],
      attackRoll: ['none', 'none'],
      defenseRoll: ['none', 'none', 'none'],
      abilities: [
        {
          title: 'Poison',
          text: 'All wounds inflicted by a Spider are considered poison wounds.'
        }
      ],
      canBeGreedy: false
    },
    {
      name: 'Cave Centipede',
      image: 'centipede.jpg',
      maxNum: 1,
      health: 4,
      attack: 'melee',
      movementRoll: [null],
      attackRoll: ['none', 'none', 'none'],
      defenseRoll: ['none', 'none'],
      abilities: [
        {
          title: 'Stun',
          text:
            "When a Cave Centipede wounds a mouse, place a stun marker on that mouse's initiative card."
        }
      ],
      canBeGreedy: false
    }
  ]
}

//Bosses
export const bossMasterList = () => {
  return [
    {
      name: 'Brodie',
      image: 'brodie.jpg',
      maxNum: 1,
      initiativeCards: [
        {
          name: 'Brodie Chases',
          image: 'brodie.jpg',
          health: 1,
          attack: 'melee',
          movementRoll: [null, null],
          attackRoll: ['none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Chase',
              text:
                "When Brodie chases, roll 2 action dice and total the numbers. The result is how far Brodie is moved on that turn. Move Brodie along the shortest path toward the closest mouse that is not already on Brodie's space. If 2 or more mice are an equal distance away, Brodie will move toward the one that is highest on the initiative track. If there are multiple shortest paths, the players can decide which path Brodie will take. If all active mice are on the same space as Brodie when he starts his chase, he will not move at all. If Brodie has any movement points left after reaching the closest mouse, continue moving Brodie toward the next closest mouse following all the rules above. Once Brodie is done moving, roll a number of action dice equal to the battle value on Brodie's chase initiative card. All figures that are on spaces that Brodie moved along on this turn (including his start and end spaces) are affected by that attack. (Only 1 attack roll is made each time Brodie chases, all affected figures must defend against that 1 roll separately.)"
            }
          ]
        },
        {
          name: 'Brodie Pounces',
          image: 'brodie.jpg',
          health: 1,
          attack: 'melee',
          movementRoll: 'brodie_pounces',
          attackRoll: ['none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Pounce',
              text:
                "When Brodie pounces, choose the space on Brodie's room tile that has the most figures on it, minions included, and move Brodie onto that space. If more than one space has an equal number of figures on it, Brodie will pounce on the space that contains the figure whose initiative card is highest on the initiative track. Roll once for the pounce’s initiative card. Each figure in that space must defend against that same attack separately. Brodie will pounce on the space he is already on if it contains the most figures or if no other spaces have figures on them."
            }
          ]
        }
      ]
    },
    {
      name: 'Captain Vurst',
      image: 'vurst.jpg',
      maxNum: 1,
      initiativeCards: [
        {
          name: 'Captain Vurst',
          image: 'vurst.jpg',
          health: 3,
          attack: 'ranged',
          movementRoll: [null],
          attackRoll: ['none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none'],
          abilities: [
            {
              title: 'Pistoleer',
              text:
                'When attacking with Vurst, if 1 or more cheese are rolled do not add them to the minion cheese wheel. Instead make an additional attack with Vurst'
            }
          ]
        }
      ]
    },
    {
      name: 'Skitter-Clak',
      image: 'skitter_clak.jpg',
      maxNum: 1,
      initiativeCards: [
        {
          name: 'Skitter-Clak',
          image: 'skitter_clak.jpg',
          health: 3,
          attack: 'melee',
          movementRoll: [null],
          attackRoll: ['none', 'none'],
          defenseRoll: ['none', 'none'],
          abilities: [
            {
              title: 'Constrict',
              text: 'Mice cannot roll to defend against Skitter-Clak'
            },
            {
              title: 'Carapace',
              text:
                'When Skitter-Clak rolls defense, all shields with success star rolled count as 2 successfull blocks'
            }
          ]
        }
      ]
    },
    {
      name: 'Vanestra',
      image: 'vanestra.jpg',
      maxNum: 1,
      initiativeCards: [
        {
          name: "Vanestra's Charm",
          image: 'vanestra.jpg',
          health: 1,
          attack: 'ranged',
          movementRoll: [null],
          attackRoll: ['none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Charm',
              text:
                "If Vansetra wounds a mouse during this turn, place a charmed marker on that mouse's initiative card."
            }
          ]
        },
        {
          name: "Vanestra's Sting",
          image: 'vanestra.jpg',
          health: 1,
          attack: 'melee',
          movementRoll: [null],
          attackRoll: ['none', 'none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Poison',
              text: 'All wounds inflicted by Vanestra are considered poison wounds.'
            }
          ]
        },
        {
          name: "Vanestra's Web",
          image: 'vanestra.jpg',
          health: 1,
          attack: 'ranged',
          movementRoll: [null],
          attackRoll: ['none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Entangle',
              text:
                "If Vansetra wounds a mouse during this turn, place a webbed marker on that mouse's initiative card."
            }
          ]
        },
        {
          name: "Vanestra's Call",
          image: 'vanestra.jpg',
          health: 1,
          attack: 'melee',
          movementRoll: [null],
          attackRoll: ['none', 'none', 'none', 'none'],
          defenseRoll: ['none', 'none', 'none', 'none'],
          abilities: [
            {
              title: 'Summon',
              text:
                'Add 1 Rat Warrior to the tile on a minion entry space. Add the Rat Warrior initiative card if necessary.'
            }
          ]
        }
      ]
    }
  ]
}
