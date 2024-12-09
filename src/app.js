import express from 'express'
import cors from 'cors'
import { requestLogger } from './support/logger.js'
import { errorHandler, badJsonHandler, notFoundHandler } from './middlewares/index.js'
import loadRoutes from './loaders/routes.js'
import './loaders/config.js'
import helmet from 'helmet'
import path from "path";

const app = express()


app.use(
    "/images/",
    express.static(path.resolve("public", "images"))
  );

/**
 * Enable CORS
 */
app.use(cors())

/**
 * Set up security headers.
 */
app.use(helmet())

// /**
//  * Set up CSRF protection.
//  */
// app.use(csurf())

/**
 * Log requests
 */
app.use(requestLogger)



/**
 * Parse JSON body
 */
app.use(express.json())

// /**
//  * Handle bad JSON format
//  */
// app.use(badJsonHandler)


/**
 * Load routes
 */
loadRoutes(app)


/**
 * Handle 404 not found error
 */
app.use(notFoundHandler)

/**
 * Catch all errors
 */
app.use(errorHandler)

export default app



//./sequelize-auto -o "./../../src/db/model" -d babbicool -h localhost -u postgres -p 5432 -x qwerty123 -e postgres
// sequelize-automate -t js -h localhost -d babbicool -u postgres -p qwerty123 -o /Users/babbicool/Documents/code/nutech/src/db/model -e postgres


