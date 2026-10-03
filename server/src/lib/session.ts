import { createHash, randomBytes } from 'node:crypto'
import type { CookieOptions, Response } from 'express'
import { db } from './db.js'

export const SESSION_COOKIE = 'sid'
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

const cookieOptions: CookieOptions = {
  httpOnly: true, // not readable from JS, so XSS can't steal it
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
}

// Only the hash is stored, so a leaked sessions table can't be used to log in
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export async function createSession(res: Response, userId: string) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)

  await db.session.create({ data: { id: hashToken(token), userId, expiresAt } })
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, expires: expiresAt })
}

export async function getSessionUser(token: string | undefined) {
  if (!token) return null

  const session = await db.session.findUnique({
    where: { id: hashToken(token) },
    include: { user: { select: { id: true, email: true, displayName: true } } },
  })
  if (!session) return null

  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }
  return session.user
}

export async function destroySession(res: Response, token: string | undefined) {
  if (token) {
    await db.session.deleteMany({ where: { id: hashToken(token) } })
  }
  res.clearCookie(SESSION_COOKIE, cookieOptions)
}
