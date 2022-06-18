import React from "react"
import styled from "@emotion/styled"
import { useAuthContext } from "~/contexts/hooks"
import NavIcon from "./NavIcon"

const BottomNavigation = () => {
  const { authProps } = useAuthContext()

  if (!authProps.currentUser) {
    return (
      <Container>
        <Wrapper>
          <NavIcon.Map />
          <NavIcon.Login />
        </Wrapper>
      </Container>
    )
  }

  if (authProps.currentUser) {
    return (
      <Container>
        <Wrapper>
          <NavIcon.Favorites />
          <NavIcon.Map />
          <NavIcon.Chat />
          <NavIcon.Reservations />
          {authProps.currentUser.role === "ADMIN" && <NavIcon.newCourt />}
        </Wrapper>
      </Container>
    )
  }

  return null
}

export default BottomNavigation

const Container = styled.nav`
  position: sticky;
  background: white;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  flex: 1;
`
