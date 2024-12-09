import { Router } from 'express'
import { makeExpressCallback ,makeValidatorCallback, auth } from '../../middlewares/index.js'
import TransactionService from './transaction.service.js'
import TransactionController from './transaction.controller.js'
import createRoutes from './transaction.routes.js'
import TransactionValidator from './transaction.validator.js'

/**
 * @module TransactionModule
 */

// Initialize the router
const router = Router()

// Initialize routes with dependencies
const routes = createRoutes({
  router,
  TransactionController,
  TransactionValidator,
  makeValidatorCallback,
  makeExpressCallback,
  auth
})

export {
  TransactionController,
  TransactionService,
  routes as TransactionRoutes
}
