import _paths from 'config/paths'
import homeRoutes from './home'
import Home from '../containers/home'

export default [
    {
        path: _paths.home,
        component: Home,
        routes: homeRoutes,
    },
]