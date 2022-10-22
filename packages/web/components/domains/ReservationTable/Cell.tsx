import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { css, useTheme } from "@emotion/react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "~/hooks"
import { useSetNavigation } from "~/layouts/Layout/navigations"
import { useReservationTableContext } from "./context"

interface Props {
  isOddTimeNumber: boolean
  isTop: boolean
  isBottom: boolean
  timeNumber: number
  intersectingTitle: string
  children: ReactNode
}

const Cell = ({
  isOddTimeNumber,
  intersectingTitle,
  isTop,
  timeNumber,
  children,
}: Props) => {
  const theme = useTheme()
  const setNavigation = useSetNavigation()
  const { tableCellHeight, isFetching } = useReservationTableContext()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (isTop && entry?.isIntersecting) {
      router.replace(
        `/reservations/courts/${
          router.query.courtId as string
        }?date=${intersectingTitle}`
      )
      setNavigation.title(intersectingTitle)
    }
    if (timeNumber === 36 && entry?.isIntersecting) {
      router.replace(
        `/reservations/courts/${
          router.query.courtId as string
        }?date=${intersectingTitle}`
      )
      setNavigation.title(intersectingTitle)
    }
  }, [entry?.isIntersecting])

  return (
    <motion.div
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
      {children}
    </motion.div>
  )
}

export default Cell
