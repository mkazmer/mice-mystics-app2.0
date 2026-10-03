import type { RequestHandler } from 'express'
import { HttpError } from '../lib/http.js'
import { getSessionUser, SESSION_COOKIE } from '../lib/session.js'

export type AuthUser = { id: string; email: string; displayName: string }

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export const requireAuth: RequestHandler = async (req, _res, next) => {
  const user = await getSessionUser(req.cookies?.[SESSION_COOKIE])
  if (!user) throw new HttpError(401, 'Not logged in')

  req.user = user
  next()
}

// Use inside routes behind requireAuth to get a non-optional user
export const currentUser = (req: Express.Request): AuthUser => {
  if (!req.user) throw new HttpError(401, 'Not logged in')
  return req.user
}
