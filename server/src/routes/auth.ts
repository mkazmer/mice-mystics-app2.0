import { hash, verify } from '@node-rs/argon2'
import { Router } from 'express'
import { z } from 'zod'
import { db } from '../lib/db.js'
import { HttpError } from '../lib/http.js'
import { createSession, destroySession, getSessionUser, SESSION_COOKIE } from '../lib/session.js'

export const authRouter = Router()

const registerSchema = z.object({
  email: z.email().transform(e => e.toLowerCase()),
  displayName: z.string().trim().min(1).max(50),
  password: z.string().min(8).max(200),
})

const loginSchema = z.object({
  email: z.email().transform(e => e.toLowerCase()),
  password: z.string().min(1),
})

const publicUser = { id: true, email: true, displayName: true } as const

// Verified against when the email doesn't exist, so response time doesn't reveal which emails are registered
const dummyHash = hash('not-a-real-password')

authRouter.post('/register', async (req, res) => {
  const { email, displayName, password } = registerSchema.parse(req.body)

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) throw new HttpError(409, 'An account with that email already exists')

  const user = await db.user.create({
    data: { email, displayName, passwordHash: await hash(password) },
    select: publicUser,
  })
  await createSession(res, user.id)
  res.status(201).json({ user })
})

authRouter.post('/login', async (req, res) => {
  const { email, password } = loginSchema.parse(req.body)

  const user = await db.user.findUnique({ where: { email } })
  const valid = await verify(user?.passwordHash ?? (await dummyHash), password)
  if (!user || !valid) throw new HttpError(401, 'Invalid email or password')

  await createSession(res, user.id)
  res.json({ user: { id: user.id, email: user.email, displayName: user.displayName } })
})

authRouter.post('/logout', async (req, res) => {
  await destroySession(res, req.cookies?.[SESSION_COOKIE])
  res.status(204).end()
})

authRouter.get('/me', async (req, res) => {
  const user = await getSessionUser(req.cookies?.[SESSION_COOKIE])
  if (!user) throw new HttpError(401, 'Not logged in')
  res.json({ user })
})
