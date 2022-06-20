import React, { useMemo, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import { ProfileAvatar } from "~/components/domains"
import { Icon, Badge } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"

const TopNavigation = () => {
  const sensorRef = useRef<HTMLDivElement>(null)

  const { authProps } = useAuthContext()

  const {
    navigationProps: {
      isBack,
      isNotifications,
      title,
      isMenu,
      handleClickBack,
      customButton,
      isProfile,
    },
  } = useNavigationContext()

  const router = useRouter()

  const handleDefaultBack = () => {
    router.back()
  }

  const unreadNotificationsCount = useMemo(
    () =>
      authProps.notifications.reduce(
        (acc, { isRead }) => acc + (isRead ? 0 : 1),
        0
      ),
    [authProps.notifications]
  )

  return (
    <>
      <Container>
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
              <Badge count={unreadNotificationsCount} dot={false} maxCount={10}>
                <Link href="/notifications" passHref>
                  <a>
                    <Icon name="bell" size={24} />
                  </a>
                </Link>
              </Badge>
            )}
            {isProfile && <ProfileAvatar.Mine />}
            {isMenu && (
              <Link href={`/user/menu`} passHref>
                <a>
                  <Icon name="menu" size={24} />
                </a>
              </Link>
            )}

            {customButton && (
              <CustomButton onClick={customButton.handleClick}>
                {customButton.title}
              </CustomButton>
            )}
          </IconGroup>
        </Wrapper>
        <TitleWrapper>{title}</TitleWrapper>
      </Container>

      <TopNavigationSensor ref={sensorRef} />
    </>
  )
}

export default TopNavigation

const Container = styled.nav`
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
    transition: opacity 200ms;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 6px 16px;
`

const TitleWrapper = styled.div`
  font-weight: 700;
  font-size: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 22px;
`

const IconGroup = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 16px;
`

const CursorIcon = styled(Icon)`
  cursor: pointer;
`

const CustomButton = styled.div`
  padding: 8px 0 8px 0;
  font-weight: 700;

  :hover {
    cursor: pointer;
  }
`

const TopNavigationSensor = styled.div`
  position: absolute;
  min-height: 56px;
  width: 100%;
`
