import { AuthFailureError } from '../core/core.errors'

export function getAccessToken(authorization) {
  if (!authorization) throw new AuthFailureError('Invalid Authorization')
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization')
  return authorization.split(' ')[1]
}
