import { combineReducers } from 'redux'
import { minionsMasterList, bossMasterList } from './creatureLists'

//REDUCERS

export default combineReducers({
  minionsMaster: minionsMasterList,
  bossMaster: bossMasterList
})
