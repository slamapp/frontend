import styled from "@emotion/styled";
import React from "react";
import { useAuthContext } from "@contexts/hooks";
import NavIcon from "./NavIcon";

const BottomNavigation = () => {
  const { authProps } = useAuthContext();
  const { role } = authProps.currentUser;

  return (
    <Container>
      <Wrapper>
        {role ? (
          <>
            <NavIcon href={"/"} iconName={"star"} pageType={"PAGE_FAVORITES"} />
            <NavIcon href={"/courts"} iconName={"map"} pageType={"PAGE_MAP"} />
            <NavIcon
              href={"/reservations"}
              iconName={"calendar"}
              pageType={"PAGE_RESERVATIONS"}
            />
          </>
        ) : (
          <>
            <NavIcon href={"/courts"} iconName={"map"} pageType={"PAGE_MAP"} />
            <NavIcon
              href={"/login"}
              iconName={"log-in"}
              pageType={"PAGE_LOGIN"}
            />
          </>
        )}

        {/* <NavIcon
          href={"/activity"}
          iconName={"users"}
          pageType={"PAGE_ACTIVITY"}
        /> */}
        {role === "ADMIN" && (
          <NavIcon
            href={"/admin/newcourts"}
            iconName={"check-square"}
            pageType={"PAGE_ADMIN_NEWCOURTS"}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default BottomNavigation;

const Container = styled.nav`
  position: sticky;
  background: white;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  flex: 1;
`;
