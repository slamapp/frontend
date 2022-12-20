import React, { useRef } from "react"
import { Box, VStack } from "@chakra-ui/react"
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
  const { top, bottom } = useNavigationValue()
  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)

  const topIntersectionObserverEntry = useIntersectionObserver(
    topIntersectionObserverRef,
    {}
  )

  return (
    <VStack align="stretch" maxW="560px" m="auto" h="100%" spacing={0}>
      <ScrollContainer>
        <Box
          ref={topIntersectionObserverRef}
          pos="absolute"
          minH="30px"
          w="100%"
        />
        {top && (
          <TopNavigation
            isShrink={!topIntersectionObserverEntry?.isIntersecting}
          />
        )}
        {children}
        <PageLoader />
      </ScrollContainer>
      {bottom && <BottomNavigation />}
    </VStack>
  )
}

export default Layout
