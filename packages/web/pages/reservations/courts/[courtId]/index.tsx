import type { NextPage } from "next"
import { ReservationTable } from "~/components/domains"

const Page: NextPage = () => {
  return (
    <ReservationTable>
      <ReservationTable.Divider />
      <ReservationTable.Cells />
    </ReservationTable>
  )
}

export default Page
