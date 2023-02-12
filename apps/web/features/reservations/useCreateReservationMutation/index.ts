import { useMutation } from '@tanstack/react-query'
import { api } from '~/api'

const useCreateReservationMutation = (courtId: Parameters<typeof api.reservations.createReservation>[0]) =>
  useMutation((data: Parameters<typeof api.reservations.createReservation>[1]) =>
    api.reservations.createReservation(courtId, data).then(({ data }) => data)
  )

export default useCreateReservationMutation
