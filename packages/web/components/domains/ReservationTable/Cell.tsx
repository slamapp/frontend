import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { css, useTheme } from "@emotion/react"
import { useIntersectionObserver } from "~/hooks"
import { useSetNavigation } from "~/layouts/Layout/navigations"
import { useReservationTableContext } from "./context"

interface Props {
  isOddTimeNumber: boolean
  isTop: boolean
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
  const { tableCellHeight } = useReservationTableContext()
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
    <div
      ref={ref}
      css={css`
        box-sizing: border-box;
        background-color: orange;
        height: ${tableCellHeight}px;
        border-top: ${isTop ? 18 : isOddTimeNumber ? 2 : 1}px solid
          ${theme.colors.black};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
    </div>
  )
}

export default Cell
