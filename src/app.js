import React, { memo, lazy, Suspense } from 'react'
import './app.css'
import 'assets/css/theme/index.less'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { hot } from 'react-hot-loader/root'
import Music from './core/music'

const Message = lazy(() => import(/* webpackChunkName: 'message' */ './containers/message'))

function App() {
    return (
        <Provider store={store}>
            <Router>
                {
                    renderRoutes(routes)
                }
                <Suspense fallback=''>
                    {/* 功能组件 */}
                    <Message />
                    <Music />
                </Suspense>
            </Router>
        </Provider >
    )
}

export default hot(memo(App))