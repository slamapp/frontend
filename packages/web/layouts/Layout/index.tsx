import React, { useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useIntersectionObserver } from "~/hooks"
import { getCookieToken } from "~/utils"
import { ScrollContainer, TopPageLoader } from "./components"
import {
  BottomNavigation,
  TopNavigation,
  useNavigationValue,
} from "./navigations"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { top = true, bottom = true } = useNavigationValue()

  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)

  const topIntersectionObserverEntry = useIntersectionObserver(
    topIntersectionObserverRef,
    {}
  )

  const isTooScrolled = !topIntersectionObserverEntry?.isIntersecting

  return (
    <ScrollContainer>
      <Box
        ref={topIntersectionObserverRef}
        pos="absolute"
        minH="30px"
        w="100%"
      />
      <TopPageLoader />
      {top && <TopNavigation isShrink={isTooScrolled} />}
      <main
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        {children}
      </main>
      {bottom && getCookieToken() && <BottomNavigation />}
    </ScrollContainer>
  )
}

export default Layout
