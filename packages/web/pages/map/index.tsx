import type { CSSProperties } from "react"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import { useTheme } from "@emotion/react"
import dayjs from "dayjs"
import { DatePicker } from "~/components/domains"
import Map from "~/components/kakaos/Map/Map"
import { Skeleton } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { getTimezoneCurrentDate } from "~/utils/date"

const MapPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const router = useRouter()
  const { authProps } = useAuthContext()
  const { useMountPage, useMountCustomButtonEvent, setNavigationTitle } =
    useNavigationContext()

  const [selectedDate, setSelectedDate] = useState(() => {
    const timezone = "Asia/Seoul"

    return dayjs().tz(timezone).hour(0).minute(0).second(0).millisecond(0)
  })

  useMountPage("PAGE_MAP")

  return (
    <>
      <DatePicker
        initialValue={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      {isLoading && <Skeleton.Box style={{ flex: 1 }} />}
      <Map
        onClick={(map) => {
          console.log("hi")
        }}
        onDragStart={() => {
          console.log("onDragStart")
        }}
        onDragEnd={() => {
          console.log("onDragEnd")
        }}
        onLoaded={() => {
          setIsLoading(false)
        }}
        style={{ flex: 1 }}
      >
        <Map.Button.CurrentLocation />
      </Map>
    </>
  )
}

export default MapPage
