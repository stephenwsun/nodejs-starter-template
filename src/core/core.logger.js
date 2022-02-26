import log4js from 'log4js'
import { logLevel } from '../config'

const logger = log4js.getLogger()
logger.level = logLevel

export default logger
