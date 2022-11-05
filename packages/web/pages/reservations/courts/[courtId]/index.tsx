import { useRouter } from "next/router"
import { ReservationTable } from "~/components/domains"
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
      {({ dates }) => (
        <>
          <ReservationTable.VerticalDivider />
          <ReservationTable.MoreCellSensor.Top />
          {getReservationsInfiniteQuery.isLoading ? (
            <>loading...</>
          ) : (
            dates
              .map(
                (date) =>
                  Array.from(Array(48).keys()).map((_, index) => ({
                    timeNumber: index,
                    date,
                  })) // 하루의 표 48개 생성
              )
              .map((cells) =>
                cells.map(({ date, timeNumber }) => {
                  return (
                    <ReservationTable.Cell
                      key={`${date}-${timeNumber}`}
                      onClick={(cell) =>
                        console.log(`${cell.date} ${cell.time}`)
                      }
                      timeNumber={timeNumber}
                      date={date}
                    />
                  )
                })
              )
          )}
          <ReservationTable.MoreCellSensor.Bottom />
        </>
      )}
    </ReservationTable>
  )
}
