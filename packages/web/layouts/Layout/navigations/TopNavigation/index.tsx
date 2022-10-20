import Link from "next/link"
import { useRouter } from "next/router"
import { Center } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import { ProfileAvatar } from "~/components/domains"
import { Badge, Icon } from "~/components/uis"
import { useGetNotificationsQuery } from "~/features/notifications"
import { useCurrentUserQuery } from "~/features/users"
import { useScrollContainer } from "~/layouts"
import { useNavigationValue } from "../atoms"

type Props = {
  isShrink: boolean
}

const TopNavigation = ({ isShrink }: Props) => {
  const theme = useTheme()
  const router = useRouter()
  const getNotificationsInfiniteQuery = useGetNotificationsQuery()
  const currentUserQuery = useCurrentUserQuery()
  const { scrollToTop } = useScrollContainer()
  const navigation = useNavigationValue()

  const unreadNotificationsCount =
    getNotificationsInfiniteQuery.data?.contents.reduce(
      (acc, { isRead }) => acc + (isRead ? 0 : 1),
      0
    ) || 0

  if (!navigation.top) {
    return null
  }

  const { Custom } = navigation.top

  return (
    <AnimatePresence mode="wait">
      {!navigation.isLoading && (
        <motion.nav
          css={css`
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
          `}
          initial={{ background: undefined }}
          animate={
            isShrink
              ? {
                  background:
                    "linear-gradient(#fafafa,#fafafa,#fafafa, transparent)",
                }
              : { background: undefined }
          }
          exit={{ opacity: 0 }}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 12px;
              height: 50px;
            `}
          >
            <IconGroup>
              {navigation.top.isBack && (
                <Center
                  h="32px"
                  w="24px"
                  cursor="pointer"
                  onClick={() => router.back()}
                >
                  <Icon name="chevron-left" size="md" />
                </Center>
              )}
            </IconGroup>
            <IconGroup>
              {navigation.top.isNotification &&
                getNotificationsInfiniteQuery.isSuccess && (
                  <Badge
                    count={unreadNotificationsCount}
                    dot={false}
                    maxCount={10}
                  >
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
                  <a>
                    <Icon name="menu" />
                  </a>
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
              onClick={scrollToTop}
              css={css`
                font-size: 28px;
                height: 42px;
                font-weight: 700;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 22px;
                cursor: pointer;
                user-select: none;
                color: ${theme.colors.black};
              `}
              initial={{
                originX: 0,
                x: isShrink
                  ? navigation.top.isBack
                    ? 30
                    : 6
                  : navigation.top.isBack
                  ? 0
                  : 0,
                y: isShrink ? -45 : 0,
                scale: isShrink ? 0.7 : 1,
                opacity: 0,
              }}
              animate={{
                originX: 0,
                x: isShrink
                  ? navigation.top.isBack
                    ? 30
                    : 6
                  : navigation.top.isBack
                  ? 0
                  : 0,
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
  align-items: center;
  gap: 16px;
`
