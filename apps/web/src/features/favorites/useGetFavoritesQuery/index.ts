import type { UseSuspenseQueryResultOnLoading, UseSuspenseQueryResultOnSuccess } from '@suspensive/react-query'
import { useSuspenseQuery } from '@suspensive/react-query'
import { api } from '~/apis'
import key from '~/features/key'

const queryFn = () => api.favorites.getMyFavorites().then(({ data }) => data)

type ResultSuccess = UseSuspenseQueryResultOnSuccess<Awaited<ReturnType<typeof queryFn>>>
export function useGetFavoritesQuery(): ResultSuccess
export function useGetFavoritesQuery(options: { enabled: true }): ResultSuccess
export function useGetFavoritesQuery(options: { enabled: false }): UseSuspenseQueryResultOnLoading
export function useGetFavoritesQuery(options: { enabled: boolean }): UseSuspenseQueryResultOnLoading | ResultSuccess
export function useGetFavoritesQuery(options?: { enabled?: boolean }) {
  return useSuspenseQuery(key.favorites.all, queryFn, { ...options })
}
