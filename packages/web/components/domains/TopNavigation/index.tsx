import React, { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { ProfileAvatar } from "~/components/domains"
import { Icon, Badge } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"

const titleWrapperVariants: Variants = {
  notShrink: { originX: 0, x: 0, y: 0, scale: 1 },
  shrink: { originX: 0, x: 6, y: -40, scale: 0.7 },
  shrinkWithBack: { originX: 0, x: 30, y: -40, scale: 0.7 },
}

const TopNavigation = () => {
  const { authProps } = useAuthContext()

  const { navigationProps } = useNavigationContext()

  const {
    isBack,
    isNotifications,
    title,
    isMenu,
    handleClickBack,
    customButton,
    isProfile,
    isTopNavShrink,
  } = navigationProps

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
      <Container
        initial={{ background: undefined }}
        animate={
          isTopNavShrink
            ? {
                background:
                  "linear-gradient(#fafafa,#fafafa,#fafafa, transparent)",
              }
            : { background: undefined }
        }
      >
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
              <Link href="/user/menu" passHref>
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

        <AnimatePresence exitBeforeEnter>
          <TitleWrapper
            variants={titleWrapperVariants}
            initial="notShrink"
            animate={
              isTopNavShrink
                ? isBack
                  ? "shrinkWithBack"
                  : "shrink"
                : "notShrink"
            }
          >
            {title}
          </TitleWrapper>
        </AnimatePresence>
      </Container>
    </>
  )
}

export default TopNavigation

const Container = styled(motion.nav)`
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
  padding: 0px 12px;
  height: 50px;
`

const TitleWrapper = styled(motion.div)`
  font-size: 28px;
  font-weight: 700;
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
