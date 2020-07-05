import React, { memo, lazy, Suspense } from 'react'
import './app.css'
import 'assets/css/theme/index.less'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

import Header from './containers/header'
import Footer from './containers/footer'
import LoadingIcon from './base-ui/loading-icon'

import { hot } from 'react-hot-loader/root'
const
    Message = lazy(() => import(/* webpackChunkName: 'message' */ './containers/message')),
    Music = lazy(() => import(/* webpackChunkName: 'music' */ './containers/music'))

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Suspense fallback={<LoadingIcon center={true} />}>
                    {renderRoutes(routes)}
                </Suspense>
                <Footer />
                {/* 功能组件 */}
                <Suspense fallback={<LoadingIcon center={true} />}>
                    <Message />
                    <Music />
                </Suspense>
            </Router>
        </Provider >
    )
}

export default hot(memo(App))