import React, { useRef } from "react"
import { Box } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { AnimatePresence } from "framer-motion"
import { useCurrentUserQuery } from "~/features/users"
import { useIntersectionObserver } from "~/hooks"
import { PageLoader, ScrollContainer } from "./components"
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
  const currentUserQuery = useCurrentUserQuery()

  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)

  const topIntersectionObserverEntry = useIntersectionObserver(
    topIntersectionObserverRef,
    {}
  )

  const isTooScrolled = !!(
    topIntersectionObserverEntry && !topIntersectionObserverEntry.isIntersecting
  )

  return (
    <ScrollContainer>
      <Box
        ref={topIntersectionObserverRef}
        pos="absolute"
        minH="30px"
        w="100%"
      />
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
      <PageLoader />
      <AnimatePresence mode="wait">
        {bottom && currentUserQuery.isSuccess && <BottomNavigation />}
      </AnimatePresence>
    </ScrollContainer>
  )
}

export default Layout