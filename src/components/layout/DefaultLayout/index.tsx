import BottomNavigation from "@components/domain/BottomNavigtion";
import { useNavigationContext } from "@contexts/NavigationProvider/hook";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

const Container = dynamic<{ children: ReactNode }>(
  () => import("./Container"),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
);

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const {
    navigationProps: { isBottomNavigation },
  } = useNavigationContext();

  return (
    <Container>
      <StyledMain>{children}</StyledMain>
      {isBottomNavigation && <BottomNavigation />}
    </Container>
  );
};

export default DefaultLayout;

const StyledMain = styled.main`
  flex: 1;
`;
