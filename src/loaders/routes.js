// Routes
import config from 'config'
import { AppHealthRoutes } from '../modules/app-health/app-health.module.js'
import { InfoRoutes } from '../modules/info/info.module.js'
import { MemberRoutes } from '../modules/member/member.module.js'
import { TransactionRoutes } from '../modules/transaction/transaction.module.js'

const routes = [
  {
    excludeAPIPrefix: true,
    path: '/health',
    route: AppHealthRoutes
  },
  {
    path: '',
    route: MemberRoutes
  },
  {
    path: '',
    route: InfoRoutes
  },
  {
    path: '',
    route: TransactionRoutes
  },
  
]

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
const registerRoutes = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    // If excludeAPIPrefix is true, use the path as is.
    // Otherwise, prepend the API_PREFIX to the path.
    const routePath = excludeAPIPrefix ? path : config.API_PREFIX + path
    // Mount the route on the app using the determined route path.
    app.use(routePath, route)
  })
}

export default registerRoutes
