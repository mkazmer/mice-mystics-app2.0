import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, ApiError } from './http'

export type User = { id: string; email: string; displayName: string }

const meKey = ['me']

// null = logged out
export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: async () => {
      try {
        const { user } = await api<{ user: User }>('/auth/me')
        return user
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) return null
        throw err
      }
    },
    staleTime: Infinity,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      api<{ user: User }>('/auth/login', { method: 'POST', body }),
    onSuccess: ({ user }) => queryClient.setQueryData(meKey, user),
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: { email: string; displayName: string; password: string }) =>
      api<{ user: User }>('/auth/register', { method: 'POST', body }),
    onSuccess: ({ user }) => queryClient.setQueryData(meKey, user),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api<void>('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      // Drop every cached query so the next user can't see this user's data
      queryClient.clear()
      queryClient.setQueryData(meKey, null)
    },
  })
}
