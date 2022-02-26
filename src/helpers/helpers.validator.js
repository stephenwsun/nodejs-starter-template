import Joi from 'joi'
import logger from '../core/core.logger'
import { BadRequestError } from '../core/core.errors'
import { Types } from 'mongoose'

export const ValidationSource = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAM: 'params',
}

export const JoiObjectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid')
    return value
  }, 'Object Id Validation')

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value, helpers) => {
    if (value.includes('://')) return helpers.error('any.invalid')
    return value
  }, 'Url Endpoint Validation')

export const JoiAuthBearer = () =>
  Joi.string().custom((value, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid')
    if (!value.split(' ')[1]) return helpers.error('any.invalid')
    return value
  }, 'Authorization Header Validation')

export default (schema, source = ValidationSource.BODY) =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source])

      if (!error) return next()

      const { details } = error
      const message = details
        .map(i => i.message.replace(/['"]+/g, ''))
        .join(',')
      logger.error(message)

      next(new BadRequestError(message))
    } catch (error) {
      next(error)
    }
  }
