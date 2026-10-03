import cookieParser from 'cookie-parser'
import express from 'express'
import { errorHandler } from './lib/http.js'
import { authRouter } from './routes/auth.js'
import { campaignsRouter } from './routes/campaigns.js'

export const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})
app.use('/api/auth', authRouter)
app.use('/api/campaigns', campaignsRouter)

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' })
})
app.use(errorHandler)
