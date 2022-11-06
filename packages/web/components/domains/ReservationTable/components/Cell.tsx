import { useCallback, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { Box, Center, Flex } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "~/hooks"
import { useSetNavigation } from "~/layouts/Layout/navigations"
import { useReservationTable } from "../context"

interface Props {
  timeNumber: number
  date: string
  onClick: (cellTime: { start: Dayjs; end: Dayjs }) => void
}

const Cell = ({ timeNumber, date, onClick }: Props) => {
  const theme = useTheme()
  const setNavigation = useSetNavigation()
  const { tableCellHeight, isFetching } = useReservationTable()
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
    const start = dayjs(`${date}T${time}:00+09:00`)

    return {
      start,
      end: start.add(30, "minute"),
    }
  }, [date, time])

  const handleClick = useCallback(() => onClick(cellTime), [cellTime, onClick])

  return (
    <Flex
      as={motion.div}
      onClick={handleClick}
      whileTap={{ backgroundColor: theme.colors.gray0200 }}
      ref={ref}
      css={css`
        box-sizing: border-box;
        height: ${tableCellHeight}px;
        border-top: ${isTop ? 4 : isOddTimeNumber ? 1 : 0.5}px solid
          ${theme.colors.black};
      `}
      animate={
        isFetching
          ? {
              color: ["#ffffff", "#000000", "#ffffff", "#000000"],
              transition: { repeat: Infinity, duration: 1 },
            }
          : { color: "#000000" }
      }
    >
      <Center flex={5}>
        <Box textAlign="center">
          {isTop && <div>{date}</div>}
          {cellTime.start.tz("Asia/Seoul").format("HH:mm")}
          {" - "}
          {cellTime.end.tz("Asia/Seoul").format("HH:mm")}
          {isBottom && <div>{date}</div>}
        </Box>
      </Center>
      <Center flex={1}>🏀</Center>
    </Flex>
  )
}

export default Cell
