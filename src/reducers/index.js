import { combineReducers } from 'redux'
import { minionsMasterList, bossMasterList } from './creatureLists'

//REDUCERS

const activeCreaturesReducer = (activeCreatures, action) => {
  if (action.type === 'ADD_CREATURES') {
    return [].concat(activeCreatures, action.payload)
  } else if (action.type === 'REMOVE_CREATURES') {
    return activeCreatures.filter(c => c.id !== action.payload)
  }
  return activeCreatures
}

export default combineReducers({
  minionsMaster: minionsMasterList,
  bossMaster: bossMasterList,
  activeCreatures: activeCreaturesReducer
})
