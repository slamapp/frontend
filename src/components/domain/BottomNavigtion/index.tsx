import styled from "@emotion/styled";
import React from "react";
import { useAuthContext } from "@contexts/hooks";
import { pageType } from "@contexts/NavigationProvider/actionTypes";
import NavIcon from "./NavIcon";

const BottomNavigation = () => {
  const { authProps } = useAuthContext();
  const { role } = authProps.currentUser;

  return (
    <Container>
      <Wrapper>
        {role ? (
          <>
            <NavIcon
              href={"/"}
              iconName={"star"}
              pageType={pageType.FAVORITES}
            />
            <NavIcon
              href={"/courts"}
              iconName={"map"}
              pageType={pageType.MAP}
            />
            <NavIcon
              href={"/reservations"}
              iconName={"calendar"}
              pageType={pageType.RESERVATIONS}
            />
          </>
        ) : (
          <>
            <NavIcon
              href={"/courts"}
              iconName={"map"}
              pageType={pageType.MAP}
            />
            <NavIcon
              href={"/login"}
              iconName={"log-in"}
              pageType={pageType.LOGIN}
            />
          </>
        )}

        {/* <NavIcon
          href={"/activity"}
          iconName={"users"}
          pageType={pageType.ACTIVITY}
        /> */}
        {role === "ADMIN" && (
          <NavIcon
            href={"/admin/newcourts"}
            iconName={"check-square"}
            pageType={pageType.ADMIN_NEWCOURTS}
          />
        )}
      </Wrapper>
    </Container>
  );
};

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

export default BottomNavigation;
