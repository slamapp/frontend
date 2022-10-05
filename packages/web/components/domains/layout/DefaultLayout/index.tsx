import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { BottomNavigation, TopNavigation } from "~/components/domains"
import { TopPageLoader } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import { useIntersectionObserver } from "~/hooks"
import ScrollContainer from "./ScrollContainer"

interface Props {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  const { navigationProps, setTopNavIsShrink } = useNavigationContext()
  const { isBottomNavigation, isTopNavigation } = navigationProps

  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)

  const topIntersectionObserverEntry = useIntersectionObserver(
    topIntersectionObserverRef,
    {}
  )

  useEffect(() => {
    if (topIntersectionObserverEntry) {
      setTopNavIsShrink(!topIntersectionObserverEntry?.isIntersecting)
    }
  }, [topIntersectionObserverEntry?.isIntersecting])

  return (
    <ScrollContainer>
      <TopPageLoader />
      {isTopNavigation && <TopNavigation />}
      <div
        ref={topIntersectionObserverRef}
        css={css`
          position: absolute;
          min-height: 30px;
          width: 100%;
        `}
      />
      <main
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        {children}
      </main>
      {isBottomNavigation && <BottomNavigation />}
    </ScrollContainer>
  )
}

export default DefaultLayout
