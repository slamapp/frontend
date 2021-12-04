import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";
import { useNavigationContext } from "@contexts/NavigationProvider/hook";
import { Icon } from "@components/base";

const BottomNavigation = () => {
  const {
    navigationProps: { currentPage },
    pageType,
  } = useNavigationContext();

  const navIcons = [
    {
      href: "/",
      name: "star",
      isCurrentPage: currentPage === pageType.FAVORITES,
    },
    {
      href: "/map",
      name: "compass",
      isCurrentPage: currentPage === pageType.MAP,
    },
    {
      href: "/book",
      name: "calendar",
      isCurrentPage: currentPage === pageType.BOOK,
    },
    {
      href: "/activities",
      name: "users",
      isCurrentPage: currentPage === pageType.ACTIVITIES,
    },
    // 테스트 용
    {
      href: "/login",
      name: "log-in",
      isCurrentPage: currentPage === pageType.LOGIN,
    },
  ] as const;

  return (
    <Container>
      <Wrapper>
        {navIcons.map(({ href, name, isCurrentPage }) => (
          <Link href={href} key={href}>
            <a>
              <Icon
                name={name}
                size={24}
                color={isCurrentPage ? "black" : "#cfcfcf"}
              />
            </a>
          </Link>
        ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.nav`
  position: sticky;
  background: white;
  display: flex;
  align-items: center;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
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
