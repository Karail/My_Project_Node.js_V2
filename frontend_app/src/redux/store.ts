import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'

import { rootReducer } from './list';


export default () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))

    return store
}
