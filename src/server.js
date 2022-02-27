import dotenv from 'dotenv/config'
import logger from './core/core.logger'
import app from './app'

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  logger.info(`Running on port ${PORT}`)
})
