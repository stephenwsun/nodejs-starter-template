import express from 'express'
import { Types } from 'mongoose'

import {
  AuthFailureError,
  AccessTokenError,
  TokenExpiredError,
} from '../core/core.errors'
import JWT from '../core/JWT'
import userRepo from '../user/user.repo'
import schema from './auth.schema'
import { getAccessToken, validateTokenData } from './auth.utils'
import validator, { ValidationSource } from '../helpers/helpers.validator'
import asyncHandler from '../helpers/helpers.handlers'

const router = express.Router()

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization)

    try {
      const payload = await JWT.validate(req.accessToken)
      validateTokenData(payload)

      const user = await userRepo.findById(new Types.ObjectId(payload.sub))
      if (!user) throw new AuthFailureError('User not registered')
      req.user = user

      return next()
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message)
      throw e
    }
  })
)
