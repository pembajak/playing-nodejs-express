import { Router } from 'express'
import { makeExpressCallback , makeValidatorCallback , auth , upload} from '../../middlewares/index.js'
import MemberService from './member.service.js'
import MemberController from './member.controller.js'
import MemberValidator from './member.validator.js'
import createRoutes from './member.routes.js'

/**
 * @module BannerModule
 */

// Initialize the router
const router = Router()

// Initialize routes with dependencies
const routes = createRoutes({
  router,
  MemberController,
  MemberValidator,
  makeValidatorCallback,
  makeExpressCallback,
  auth,
  upload
})

export {
  MemberController,
  MemberService,
  routes as MemberRoutes
}
