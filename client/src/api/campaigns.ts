import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './http'

export type CampaignStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED'

export type Campaign = {
  id: string
  name: string
  status: CampaignStatus
  currentChapter: number
  notes: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  _count?: { heroes: number }
}

export type CampaignUpdate = Partial<Pick<Campaign, 'name' | 'status' | 'currentChapter' | 'notes'>>

const campaignsKey = ['campaigns']

export function useCampaigns() {
  return useQuery({
    queryKey: campaignsKey,
    queryFn: async () => (await api<{ campaigns: Campaign[] }>('/campaigns')).campaigns,
  })
}

export function useCreateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: { name: string }) => api<{ campaign: Campaign }>('/campaigns', { method: 'POST', body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignsKey }),
  })
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...body }: CampaignUpdate & { id: string }) =>
      api<{ campaign: Campaign }>(`/campaigns/${id}`, { method: 'PATCH', body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignsKey }),
  })
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api<void>(`/campaigns/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignsKey }),
  })
}
