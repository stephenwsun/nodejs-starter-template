import mongoose from 'mongoose'
import logger from '../core/logger'
import { env, db } from '../config'

const uri =
  env === 'dev'
    ? `mongodb://${db.host}:${db.port}`
    : `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${
        db.port
      }/${db.name}`

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

logger.debug(uri)

// Create the database connection
mongoose
  .connect(uri, options)
  .then(() => {
    logger.info('Mongoose connection done')
  })
  .catch(e => {
    logger.info('Mongoose connection error')
    logger.error(e)
  })

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection open to ' + uri)
})

// If the connection throws an error
mongoose.connection.on('error', err => {
  logger.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})
