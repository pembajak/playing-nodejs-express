import { Router } from 'express'
import { makeExpressCallback , auth } from '../../middlewares/index.js'
import InfoService from './info.service.js'
import InfoController from './info.controller.js'
import createRoutes from './info.routes.js'

/**
 * @module InfoModule
 */

// Initialize the router
const router = Router()

// Initialize routes with dependencies
const routes = createRoutes({
  router,
  InfoController,
  makeExpressCallback,
  auth
})

export {
  InfoController,
  InfoService,
  routes as InfoRoutes
}
