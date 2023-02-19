import type { APIReservation } from '@slam/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/apis'

const useDeleteReservationMutation = () =>
  useMutation((reservationId: APIReservation['id']) => api.reservations.deleteReservation(reservationId))

export default useDeleteReservationMutation
