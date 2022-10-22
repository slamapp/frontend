import { useRouter } from "next/router"
import { Box, Spinner } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useQueryClient } from "@tanstack/react-query"
import { ReservationTable } from "~/components/domains"
import { key } from "~/features"
import { useGetReservationsInfiniteQuery } from "~/features/reservations"
import { withNavigation } from "~/layouts/Layout/navigations"
import type { APICourt } from "~/types/domains/objects"

const Page = withNavigation(
  {
    top: { isBack: true, title: "" },
  },
  () => {
    const router = useRouter()
    if (!router.isReady || !router.query.courtId || !router.query.date) {
      return <>date is required</>
    }

    return (
      <Container
        courtId={router.query.courtId as string}
        date={router.query.date as string}
      />
    )
  }
)

export default Page

const Container = ({
  courtId,
  date,
}: {
  courtId: APICourt["id"]
  date: string
}) => {
  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  return (
    <ReservationTable courtId={courtId} date={date}>
      <ReservationTable.VerticalDivider />
      <ReservationTable.MoreCellSensor.Top />
      {getReservationsInfiniteQuery.isLoading ? (
        <>loading...</>
      ) : (
        <ReservationTable.Cells data={{}} />
      )}
      <ReservationTable.MoreCellSensor.Bottom />
    </ReservationTable>
  )
}
