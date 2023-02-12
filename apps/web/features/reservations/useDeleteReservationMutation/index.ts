import { useMutation } from '@tanstack/react-query'
import { api } from '~/api'
import { APIReservation } from '~/types/domains/objects'

const useDeleteReservationMutation = () =>
  useMutation((reservationId: APIReservation['id']) => api.reservations.deleteReservation(reservationId))

export default useDeleteReservationMutation
