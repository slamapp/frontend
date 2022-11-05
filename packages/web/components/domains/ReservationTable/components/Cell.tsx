import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { css, useTheme } from "@emotion/react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "~/hooks"
import { useSetNavigation } from "~/layouts/Layout/navigations"
import { useReservationTable } from "../context"

interface Props {
  timeNumber: number
  date: string
  onClick: (cell: { date: string; time: string }) => void
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

  return (
    <motion.div
      onClick={() => onClick({ date, time })}
      ref={ref}
      css={css`
        box-sizing: border-box;
        height: ${tableCellHeight}px;
        border-top: ${isTop ? 4 : isOddTimeNumber ? 1 : 0.5}px solid
          ${theme.colors.black};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
      {isTop && <div>{date}</div>}
      {time}
      {isBottom && <div>{date}</div>}
    </motion.div>
  )
}

export default Cell
