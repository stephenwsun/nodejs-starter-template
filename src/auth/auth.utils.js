import { Types } from 'mongoose'

import JWT, { JwtPayload } from '../core/core.jwt'
import { AuthFailureError, InternalError } from '../core/core.errors'
import { tokenInfo } from '../config'

export function getAccessToken(authorization) {
  if (!authorization) throw new AuthFailureError('Invalid Authorization')
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization')
  return authorization.split(' ')[1]
}

export const validateTokenData = payload => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthFailureError('Invalid Access Token')
  return true
}

export const createTokens = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      accessTokenKey,
      tokenInfo.accessTokenValidityDays
    )
  )

  if (!accessToken) throw new InternalError()

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays
    )
  )

  if (!refreshToken) throw new InternalError()

  return {
    accessToken,
    refreshToken,
  }
}
