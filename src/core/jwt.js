import jwt from 'jsonwebtoken'
import logger from '../core/logger'
import { promisify } from 'util'
import { jwtSecret } from '../config'
import { BadTokenError, TokenExpiredError } from './error'

export default class JWT {
  constructor() {}

  encode(jwtPayload) {
    return jwt.sign(jwtPayload, jwtSecret)
  }

  /**
   * This method decodes the token and returns the decoded payload if the signature is valid even if it is expired.
   */
  async decode(token) {
    try {
      const verify = promisify(jwt.verify)
      return await verify(token, jwtSecret, { ignoreExpiration: true })
    } catch (err) {
      logger.debug(err)
      throw new BadTokenError()
    }
  }

  /**
   * This method checks the token and returns the decoded data if token is valid.
   */
  async validate(token) {
    try {
      const verify = promisify(jwt.verify)
      return await verify(token, jwtSecret)
    } catch (err) {
      logger.debug(err)
      if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError()
      // throws error if the token has not been encrypted by the private key
      throw new BadTokenError()
    }
  }
}

export class JwtPayload {
  constructor(issuer, audience, subject, param, validity) {
    this.iss = issuer
    this.aud = audience
    this.sub = subject
    this.iat = Math.floor(Date.now() / 1000)
    this.exp = this.iat + validity * 24 * 60 * 60
    this.prm = param
  }
}
