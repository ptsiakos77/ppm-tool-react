import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';

const reduxDevDools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middlwares = (process.env.NODE_ENV === 'development') ? compose(applyMiddleware(thunk), reduxDevDools) : compose(applyMiddleware(thunk))
const store = createStore(rootReducer, middlwares)

export default store


