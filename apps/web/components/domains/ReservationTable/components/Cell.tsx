import { useCallback, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { Box, Center, Flex } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "~/hooks"
import { useScrollContainer } from "~/layouts"
import { useSetNavigation } from "~/layouts/Layout/navigations"
import { useReservationTable } from "../context"

interface Props {
  timeNumber: number
  date: string
  onClick: (cellTime: { start: Dayjs; end: Dayjs }) => void
}

const Cell = ({ timeNumber, date, onClick }: Props) => {
  const scrollContainer = useScrollContainer()
  const theme = useTheme()
  const setNavigation = useSetNavigation()
  const { tableCellHeight, isNeedToScrollUnderDisabledCell } =
    useReservationTable()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  const hour = Math.floor(timeNumber / 2)
  const isOddTimeNumber = Math.abs(timeNumber % 2) === 0
  const isTop = hour === 0 && isOddTimeNumber
  const isBottom = hour === 23 && !isOddTimeNumber
  const hourLocaleString = hour.toLocaleString("es-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  const time = isOddTimeNumber
    ? `${hourLocaleString}:00`
    : `${hourLocaleString}:30`

  useEffect(() => {
    if (isTop && entry?.isIntersecting) {
      router.replace(
        `/reservations/courts/${router.query.courtId as string}?date=${date}`
      )
      setNavigation.title(date)
    }
    if (timeNumber === 36 && entry?.isIntersecting) {
      router.replace(
        `/reservations/courts/${router.query.courtId as string}?date=${date}`
      )
      setNavigation.title(date)
    }
  }, [entry?.isIntersecting])

  const cellTime = useMemo(() => {
    const start = dayjs(`${date}T${time}:00+09:00`).tz()

    return {
      start,
      end: start.add(30, "minute"),
    }
  }, [date, time])

  const today = dayjs()
  const isDisabled = cellTime.start.isBefore(today)
  const diff = cellTime.start.diff(today, "m")
  const isNeedToScrollToThisCell = diff > -15 && diff < 15

  const handleClick = useCallback(() => onClick(cellTime), [cellTime, onClick])

  useEffect(() => {
    // INTENTION: scroll to area under disabled cell to improve UX of user reservation flow
    if (
      ref.current &&
      isNeedToScrollUnderDisabledCell &&
      isNeedToScrollToThisCell
    ) {
      const rect = ref.current.getBoundingClientRect()
      scrollContainer.to(rect.bottom + tableCellHeight * 3)
    }
  }, [])

  return (
    <Flex
      ref={ref}
      as={motion.div}
      onClick={isDisabled ? undefined : handleClick}
      whileTap={{ backgroundColor: theme.colors.gray0200 }}
      boxSizing="border-box"
      height={`${tableCellHeight}px`}
      borderTop={`${isTop ? 4 : isOddTimeNumber ? 1 : 0.5}px solid ${
        theme.colors.black
      }`}
      animate={{
        color: "#000000",
        filter: isDisabled ? "contrast(0.2)" : undefined,
        backgroundColor: isDisabled ? theme.colors.gray0100 : undefined,
      }}
    >
      <Center flex={5}>
        <Box textAlign="center">
          {isTop && <div>{date}</div>}
          {cellTime.start.tz().format("HH:mm")}
          {" - "}
          {cellTime.end.tz().format("HH:mm")}
          {isBottom && <div>{date}</div>}
        </Box>
      </Center>
      <Center flex={1}>🏀</Center>
    </Flex>
  )
}

export default Cell
