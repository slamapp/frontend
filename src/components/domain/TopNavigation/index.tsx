import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useNavigationContext } from "@contexts/NavigationProvider";
import { Icon, Avatar, Badge } from "@components/base";

interface Props {
  isTransparent: boolean;
}

const TopNavigation = forwardRef<HTMLElement, Props>(
  ({ isTransparent }, ref) => {
    const {
      navigationProps: {
        isBack,
        isNotifications,
        isProfile,
        title,
        isMenu,
        isNext,
        handleClickBack,
        handleClickNext,
      },
    } = useNavigationContext();

    const handleDefault = () => {};

    return (
      <Container isTransparent={isTransparent} ref={ref}>
        <Wrapper>
          <IconGroup>
            {isBack && (
              <CursorIcon
                name="chevron-left"
                size={24}
                onClick={handleClickBack || handleDefault}
              />
            )}
          </IconGroup>
          <IconGroup>
            {isNotifications && (
              <Badge count={0} maxCount={10}>
                <Link href="/notifications">
                  <a>
                    <Icon name="bell" size={24} />
                  </a>
                </Link>
              </Badge>
            )}
            {isProfile && (
              <Link href={`/user/${1}`}>
                <a>
                  <Avatar
                    size={32}
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                  />
                </a>
              </Link>
            )}
            {isMenu && (
              <Link href={`/user/${1}/menu`}>
                <a>
                  <Icon name="menu" size={24} />
                </a>
              </Link>
            )}

            {isNext && (
              <NextButton onClick={handleClickNext || handleDefault}>
                다음
              </NextButton>
            )}
          </IconGroup>
        </Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      </Container>
    );
  }
);

export default TopNavigation;

const Container = styled.nav<{ isTransparent: boolean }>`
  padding-top: 2px;
  z-index: 1000;
  position: sticky;
  top: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    height: 56px;
    background: ${({ theme }) => "white"};
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
    transition: opacity 200ms;
    opacity: ${({ isTransparent }) => (isTransparent ? 0 : 1)};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  display: block;
  width: 60%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  pointer-events: none;
`;

const IconGroup = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CursorIcon = styled(Icon)`
  cursor: pointer;
`;

const NextButton = styled.div`
  padding: 12px;
  font-weight: 700;
`;
