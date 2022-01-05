import React, { ReactNode, useRef } from "react";
import styled from "@emotion/styled";
import { BottomNavigation, TopNavigation } from "@components/domain";
import { useNavigationContext } from "@contexts/hooks";
import Container from "./Container";

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const { navigationProps } = useNavigationContext();
  const { isBottomNavigation, isTopNavigation } = navigationProps;

  return (
    <Container>
      {isTopNavigation && <TopNavigation />}
      <StyledMain>{children}</StyledMain>
      {isBottomNavigation && <BottomNavigation />}
    </Container>
  );
};

export default DefaultLayout;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
