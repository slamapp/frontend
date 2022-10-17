import { ReservationTable } from "~/components/domains"
import { withNavigation } from "~/layouts/Layout/navigations"

const Page = withNavigation(
  {
    top: { isBack: true, title: "" },
  },
  () => {
    return (
      <ReservationTable>
        <ReservationTable.Divider />
        <ReservationTable.Cells />
      </ReservationTable>
    )
  }
)

export default Page
