import { lazy } from 'react'
import _paths from 'config/paths'
import homeRoutes from './home'
const Home = lazy(() => import(/* webpackChunkName: 'home' */ '../containers/home'))

export default [
    {
        path: _paths.home,
        component: Home,
        routes: homeRoutes,
    },
]