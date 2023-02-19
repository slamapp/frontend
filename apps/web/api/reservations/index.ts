import { APICourt, APIReservation, APIUser, CursorList, CursorListRequestOption, List } from '@slam/types'
import { http } from '~/api/core'

export default {
  getMyUpcomingReservations: () => http.get<List<APIReservation>>('/reservations/upcoming'),

  getMyExpiredReservations: ({ isFirst, lastId = null, size = 5 }: CursorListRequestOption<APIReservation>) =>
    http.get<CursorList<APIReservation>>('/reservations/expired', {
      params: { isFirst, lastId, size },
    }),

  getReservationsAtDate: (params: { courtId: APICourt['id']; date: string }) =>
    http.get<List<APIReservation>>('/reservations', { params }),

  getMyReservationParticipants: ({
    courtId,
    startTime,
    endTime,
  }: Pick<APIReservation, 'startTime' | 'endTime'> & {
    courtId: APICourt['id']
  }) =>
    http.get<{
      participants: (Pick<APIUser, 'nickname' | 'profileImage'> & {
        userId: APIUser['id']
        isFollowed: boolean
      })[]
    }>(`/reservations/${courtId}/${startTime}/${endTime}`),

  createReservation: (courtId: APICourt['id'], data: Pick<APIReservation, 'startTime' | 'endTime' | 'hasBall'>) =>
    http.post<
      Pick<APIReservation, 'startTime' | 'endTime' | 'hasBall' | 'createdAt' | 'updatedAt'> & {
        reservationId: APIReservation['id']
        courtId: APIReservation['court']['id']
        userId: APIReservation['creator']['id']
      }
    >('/reservations', { data: { courtId, ...data } }),

  deleteReservation: (reservationId: APIReservation['id']) => http.delete(`/reservations/${reservationId}`),
} as const
