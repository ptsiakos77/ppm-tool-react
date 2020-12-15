import { combineReducers } from 'redux'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import taskReducer from './taskReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({ project: projectReducer, user: userReducer, task: taskReducer, error: errorReducer })

export default rootReducer