import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Icon, Badge } from "@components/base";
import { useRouter } from "next/router";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import LinkAvatar from "../LinkAvatar";

const TopNavigation = forwardRef<HTMLElement>((_, ref) => {
  const {
    authProps: { currentUser },
  } = useAuthContext();
  const { userId, profileImageUrl, notifications } = currentUser;

  const {
    navigationProps: {
      isBack,
      isNotifications,
      isProfile,
      title,
      isMenu,
      handleClickBack,
      customButton,
      isTopTransparent,
    },
  } = useNavigationContext();

  const router = useRouter();

  const handleDefaultBack = () => {
    router.back();
  };

  return (
    <Container isTransparent={isTopTransparent} ref={ref}>
      <Wrapper>
        <IconGroup>
          {isBack && (
            <CursorIcon
              name="chevron-left"
              size={24}
              onClick={handleClickBack || handleDefaultBack}
            />
          )}
        </IconGroup>
        <IconGroup>
          {isNotifications && (
            <Badge
              count={notifications.reduce(
                (acc, { isRead }) => acc + (isRead ? 0 : 1),
                0
              )}
              showZero
              dot={false}
              maxCount={10}
            >
              <Link href="/notifications" passHref>
                <Icon name="bell" size={24} />
              </Link>
            </Badge>
          )}
          {isProfile && (
            <LinkAvatar
              userId={userId || 1}
              imageUrl={
                profileImageUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
            />
          )}
          {isMenu && (
            <Link href={`/user/menu`} passHref>
              <Icon name="menu" size={24} />
            </Link>
          )}

          {customButton && (
            <CustomButton onClick={customButton.handleClick}>
              {customButton.title}
            </CustomButton>
          )}
        </IconGroup>
      </Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  );
});

export default TopNavigation;

const Container = styled.nav<{ isTransparent: boolean }>`
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
    background: ${({ theme }) => theme.colors.white};
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
  font-size: 16px;
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

const CustomButton = styled.div`
  padding: 12px;
  font-weight: 700;

  :hover {
    cursor: pointer;
  }
`;
