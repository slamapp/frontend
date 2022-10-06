import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { ProfileAvatar } from "~/components/domains"
import { Badge, Icon } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { useScrollContainer } from "../layout/DefaultLayout/ScrollContainer"

const titleWrapperVariants: Variants = {
  notShrink: { originX: 0, x: 0, y: 0, scale: 1 },
  shrink: { originX: 0, x: 6, y: -45, scale: 0.7 },
  shrinkWithBack: { originX: 0, x: 30, y: -45, scale: 0.7 },
}

const TopNavigation = () => {
  const { authProps } = useAuthContext()
  const { scrollToTop } = useScrollContainer()

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
              onClick={handleClickBack || handleDefaultBack}
            />
          )}
        </IconGroup>
        <IconGroup>
          {isNotifications && (
            <Badge count={unreadNotificationsCount} dot={false} maxCount={10}>
              <Link href="/notifications" passHref>
                <a>
                  <motion.div
                    initial={{ rotateZ: 0 }}
                    animate={
                      unreadNotificationsCount > 0
                        ? {
                            rotateZ: [0, 15, 0 - 15, 0, 15, 0, -15, 0],
                            transition: {
                              repeat: Infinity,
                              repeatDelay: 3,
                            },
                          }
                        : {
                            rotateZ: 0,
                          }
                    }
                  >
                    <Icon name="bell" />
                  </motion.div>
                </a>
              </Link>
            </Badge>
          )}
          {isProfile && <ProfileAvatar.Mine />}
          {isMenu && (
            <Link href="/user/menu" passHref>
              <a>
                <Icon name="menu" />
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

      <AnimatePresence mode="wait">
        <motion.div
          onClick={scrollToTop}
          css={css`
            font-size: 28px;
            font-weight: 700;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 22px;
            cursor: pointer;
            user-select: none;
          `}
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
        </motion.div>
      </AnimatePresence>
    </Container>
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
