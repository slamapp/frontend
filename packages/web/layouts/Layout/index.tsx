import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigationContext } from "~/contexts/hooks"
import { useCurrentUserQuery } from "~/features/users"
import { useIntersectionObserver } from "~/hooks"
import { useTokenCookie } from "~/hooks/domain"
import { getLocalToken } from "~/utils"
import {
  BottomNavigation,
  ScrollContainer,
  TopNavigation,
  TopPageLoader,
} from "./components"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const queryClient = useQueryClient()
  const tokenCookie = useTokenCookie()

  useEffect(() => {
    if (!tokenCookie.get()) {
      if (getLocalToken()) {
        tokenCookie.remove()
        localStorage.clear()
        queryClient.invalidateQueries()
      }
    }
  }, [])

  const currentUserQuery = useCurrentUserQuery()
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
      {isBottomNavigation && currentUserQuery.isSuccess && <BottomNavigation />}
    </ScrollContainer>
  )
}

export default Layout
