import Link from 'next/link'
import { useRouter } from 'next/router'
import { Center } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Delay, Suspense } from '@suspensive/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProfileAvatar } from '~/components/domains'
import { Badge, Icon, Skeleton } from '~/components/uis'
import { useGetNotificationsQuery } from '~/features/notifications'
import { useCurrentUserQuery } from '~/features/users'
import { useScrollContainer } from '~/layouts'
import { useNavigationValue } from '../atoms'

type Props = {
  isShrink: boolean
}

const TopNavigation = ({ isShrink }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const currentUserQuery = useCurrentUserQuery()
  const scrollContainer = useScrollContainer()
  const navigation = useNavigationValue()

  console.log(navigation)

  if (!navigation.top) {
    return null
  }

  const { Custom } = navigation.top

  return (
    <AnimatePresence mode="wait">
      {!navigation.isLoading && (
        <motion.nav
          css={css`
            position: sticky;
            top: 0;
            z-index: 1000;

            &::before {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: block;
              height: 56px;
              transition: opacity 200ms;
              content: '';
            }
          `}
          initial={{ background: undefined }}
          animate={
            isShrink
              ? {
                  background: 'linear-gradient(#fafafa,#fafafa,#fafafa, transparent)',
                }
              : { background: undefined }
          }
          exit={{ opacity: 0 }}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 50px;
              padding: 0px 12px;
            `}
          >
            <IconGroup>
              {navigation.top.isBack && (
                <Center h="32px" w="24px" cursor="pointer" onClick={() => router.back()}>
                  <Icon name="chevron-left" size="md" />
                </Center>
              )}
            </IconGroup>
            <IconGroup>
              {currentUserQuery.isSuccess && navigation.top.isNotification && (
                <Suspense.CSROnly
                  fallback={
                    <Delay>
                      <Skeleton.Circle size={24} />
                    </Delay>
                  }
                >
                  <Notification />
                </Suspense.CSROnly>
              )}
              {navigation.top.isProfile && currentUserQuery.isSuccess && (
                <ProfileAvatar
                  user={{
                    id: currentUserQuery.data.id,
                    profileImage: currentUserQuery.data.profileImage,
                  }}
                />
              )}
              {navigation.top.isMenu && (
                <Link href="/user/menu" passHref>
                  <Icon name="menu" />
                </Link>
              )}
              {Custom && (
                <div
                  css={css`
                    padding: 8px 0 8px 0;
                    font-weight: 700;

                    :hover {
                      cursor: pointer;
                    }
                  `}
                >
                  <Custom />
                </div>
              )}
            </IconGroup>
          </div>

          <AnimatePresence mode="wait" key={navigation.top.title}>
            <motion.div
              onClick={scrollContainer.toTop}
              css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 42px;
                padding-left: 22px;
                color: ${theme.colors.black};
                font-weight: 700;
                font-size: 28px;
                cursor: pointer;
                user-select: none;
              `}
              initial={{
                originX: 0,
                x: isShrink ? (navigation.top.isBack ? 30 : 6) : navigation.top.isBack ? 0 : 0,
                y: isShrink ? -45 : 0,
                scale: isShrink ? 0.7 : 1,
                opacity: 0,
              }}
              animate={{
                originX: 0,
                x: isShrink ? (navigation.top.isBack ? 30 : 6) : navigation.top.isBack ? 0 : 0,
                y: isShrink ? -45 : 0,
                scale: isShrink ? 0.7 : 1,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
            >
              {navigation.top.title}
            </motion.div>
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default TopNavigation

const IconGroup = styled.div`
  z-index: 1000;
  display: flex;
  gap: 16px;
  align-items: center;
`

const Notification = () => {
  const getNotificationsQuery = useGetNotificationsQuery()

  const unreadNotificationsCount =
    getNotificationsQuery.data.contents.reduce((acc, { isRead }) => acc + (isRead ? 0 : 1), 0) || 0

  return (
    <Badge count={unreadNotificationsCount} dot={false} maxCount={10}>
      <Link href="/notifications" passHref>
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
      </Link>
    </Badge>
  )
}
