import { useMutation } from "@tanstack/react-query"
import { api } from "~/api"

const useCreateReservationMutation = ({
  courtId,
}: Pick<
  Parameters<typeof api.reservations.createReservation>[0],
  "courtId"
>) => {
  return useMutation(
    (
      params: Pick<
        Parameters<typeof api.reservations.createReservation>[0],
        "endTime" | "startTime" | "hasBall"
      >
    ) =>
      api.reservations
        .createReservation({ courtId, ...params })
        .then(({ data }) => data)
  )
}

export default useCreateReservationMutation
