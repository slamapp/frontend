import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { BottomNavigation, TopNavigation } from "~/components/domains"
import { TopPageLoader } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import Container from "./Container"

const DefaultLayout: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { navigationProps, setTopNavIsShrink } = useNavigationContext()
  const { isBottomNavigation, isTopNavigation } = navigationProps

  const setTopIsShrinkByScroll = () => {
    if (containerRef.current) {
      setTopNavIsShrink(containerRef.current.scrollTop > 80)
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", setTopIsShrinkByScroll)

    return () =>
      containerRef.current?.removeEventListener(
        "scroll",
        setTopIsShrinkByScroll
      )
  }, [containerRef])

  return (
    <Container ref={containerRef}>
      <TopPageLoader />
      {isTopNavigation && <TopNavigation />}
      <StyledMain>{children}</StyledMain>
      <ToastPortal
        id="toast-portal"
        isBottomNavigation={isBottomNavigation}
        containerRect={containerRef.current?.getClientRects()[0]}
      />
      {isBottomNavigation && <BottomNavigation />}
    </Container>
  )
}

export default DefaultLayout

const ToastPortal = styled.div<{
  isBottomNavigation?: boolean
  containerRect?: DOMRect
}>`
  ${({ isBottomNavigation, containerRect }) => css`
    position: fixed;
    left: ${(containerRect?.left || 0) + 16}px;
    width: ${(containerRect?.width || 0) - 32}px;
    bottom: ${isBottomNavigation ? 72 : 16}px;
  `}
`

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`
