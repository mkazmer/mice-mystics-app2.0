import { Router } from 'express'
import { z } from 'zod'
import { db } from '../lib/db.js'
import { HttpError } from '../lib/http.js'
import { currentUser, requireAuth } from '../middleware/requireAuth.js'

export const campaignsRouter = Router()
campaignsRouter.use(requireAuth)

const createSchema = z.object({
  name: z.string().trim().min(1).max(100),
})

const updateSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED']).optional(),
  currentChapter: z.int().min(1).max(99).optional(),
  notes: z.string().max(5000).nullable().optional(),
})

// Every lookup is scoped to the logged-in user, so nobody can read another user's campaign by guessing an id
async function findOwnedCampaign(id: string, userId: string) {
  const campaign = await db.campaign.findFirst({ where: { id, userId } })
  if (!campaign) throw new HttpError(404, 'Campaign not found')
  return campaign
}

campaignsRouter.get('/', async (req, res) => {
  const campaigns = await db.campaign.findMany({
    where: { userId: currentUser(req).id },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { heroes: true } } },
  })
  res.json({ campaigns })
})

campaignsRouter.post('/', async (req, res) => {
  const { name } = createSchema.parse(req.body)
  const campaign = await db.campaign.create({
    data: { name, userId: currentUser(req).id },
  })
  res.status(201).json({ campaign })
})

campaignsRouter.get('/:id', async (req, res) => {
  const campaign = await db.campaign.findFirst({
    where: { id: req.params.id, userId: currentUser(req).id },
    include: { heroes: { include: { items: true } } },
  })
  if (!campaign) throw new HttpError(404, 'Campaign not found')
  res.json({ campaign })
})

campaignsRouter.patch('/:id', async (req, res) => {
  const existing = await findOwnedCampaign(req.params.id, currentUser(req).id)
  const data = updateSchema.parse(req.body)

  const completedAt =
    data.status === undefined || data.status === existing.status
      ? undefined
      : data.status === 'COMPLETED'
        ? new Date()
        : null

  const campaign = await db.campaign.update({
    where: { id: existing.id },
    data: { ...data, completedAt },
  })
  res.json({ campaign })
})

campaignsRouter.delete('/:id', async (req, res) => {
  const existing = await findOwnedCampaign(req.params.id, currentUser(req).id)
  await db.campaign.delete({ where: { id: existing.id } })
  res.status(204).end()
})
