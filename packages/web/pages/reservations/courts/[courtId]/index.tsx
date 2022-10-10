import type { NextPage } from "next"
import { ReservationTable } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"

const Page: NextPage = () => {
  const { useMountPage } = useNavigationContext()

  useMountPage("PAGE_RESERVATIONS_COURTS")

  return (
    <ReservationTable>
      <ReservationTable.Divider />
      <ReservationTable.Cells />
    </ReservationTable>
  )
}

export default Page
