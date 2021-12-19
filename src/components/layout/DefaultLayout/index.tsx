import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BottomNavigation, TopNavigation } from "@components/domain";
import { useNavigationContext } from "@contexts/hooks";
import Container from "./Container";

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const { navigationProps, setIsTopTransparent } = useNavigationContext();
  const { isBottomNavigation, isTopNavigation } = navigationProps;

  const topNavigationRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () =>
    topNavigationRef.current &&
    setIsTopTransparent(topNavigationRef.current.offsetTop < 56);

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container ref={containerRef}>
      {isTopNavigation && <TopNavigation ref={topNavigationRef} />}
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
