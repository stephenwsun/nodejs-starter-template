import jwt, { JwtPayload } from './core.jwt'
import { BadTokenError, TokenExpiredError } from './core.errors'

const ISSUER = 'issuer'
const AUDIENCE = 'audience'
const SUBJECT = 'subject'
const PARAM = 'param'
const VALIDITY = 1

describe('JWT class tests', () => {
  it('Should throw error for invalid token in jwt.decode', async () => {
    try {
      await jwt.decode('abc')
    } catch (e) {
      expect(e).toBeInstanceOf(BadTokenError)
    }
  })

  it('Should throw error for invalid token in jwt.validate', async () => {
    try {
      await jwt.validate('abc')
    } catch (err) {
      expect(err).toBeInstanceOf(BadTokenError)
    }
  })

  it('Should validate a valid token for jwt.validate', async () => {
    const time = Math.floor(Date.now() / 1000)
    const payload = {
      aud: AUDIENCE,
      sub: SUBJECT,
      iss: ISSUER,
      iat: time,
      exp: time + VALIDITY * 24 * 60 * 60,
      prm: PARAM,
    }
    const token = await jwt.encode(payload)
    const decoded = await jwt.validate(token)

    expect(decoded).toMatchObject(payload)
  })

  it('Should validate a token expiry for JWT.validate', async () => {
    const time = Math.floor(Date.now() / 1000)

    const payload = {
      aud: AUDIENCE,
      sub: SUBJECT,
      iss: ISSUER,
      iat: time,
      exp: time,
      prm: PARAM,
    }
    const token = await jwt.encode(payload)
    try {
      await jwt.validate(token)
    } catch (err) {
      expect(err).toBeInstanceOf(TokenExpiredError)
    }
  })
})
