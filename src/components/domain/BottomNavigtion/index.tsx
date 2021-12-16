import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";
import { Icon } from "@components/base";
import { useNavigationContext } from "@contexts/hooks";

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
      href: "/courts",
      name: "compass",
      isCurrentPage: currentPage === pageType.MAP,
    },
    {
      href: "/reservations",
      name: "calendar",
      isCurrentPage: currentPage === pageType.RESERVATIONS,
    },

    // TODO: 2순위: 팔로우한 사용자들의 예약 알기 탭
    // {
    //   href: "/activity",
    //   name: "users",
    //   isCurrentPage: currentPage === pageType.ACTIVITY,
    // },
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
