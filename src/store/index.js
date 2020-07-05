import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const
    sagaMiddleware = createSagaMiddleware(),
    composeEnhanders = typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose,
    enhancer = composeEnhanders(applyMiddleware(sagaMiddleware))

export default createStore(reducers, enhancer)
sagaMiddleware.run(sagas)