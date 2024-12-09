/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { Sequelize } from 'sequelize'
import configFile from '../../../config/dbConfig.js'
import UserModel from './User.js'
import BannerModel from './Banner.js'
import ServiceModel from './Service.js'
import TransactionModel from './Transaction.js'

/**
 * Initializes and configures the Sequelize instance and models.
 * @module db/models
 */

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]
const db = {}


let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  console.log("process.env.DB_PASSWORD" , process.env.DB_PASSWORD)
  sequelize = new Sequelize(
    config.database,
    config.username,
    "qwerty123",
    config
  )
  // sequelize = new Sequelize(
  //   config.database,
  //   config.username,
  //   process.env.DB_PASSWORD,
  //   config
  // )
}


db.Banner = BannerModel(sequelize, Sequelize.DataTypes)
db.User = UserModel(sequelize, Sequelize.DataTypes)
db.Service = ServiceModel(sequelize, Sequelize.DataTypes)
db.Transaction = TransactionModel(sequelize, Sequelize.DataTypes)

//db.User = UserModel(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { sequelize, Sequelize }

export default db
