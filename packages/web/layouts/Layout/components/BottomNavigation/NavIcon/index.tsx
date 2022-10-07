import type { ComponentProps } from "react"
import { useEffect, useRef, useState } from "react"
import { Router, useRouter } from "next/router"
import { Spinner, VStack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { motion } from "framer-motion"
import { Icon } from "~/components/uis"
import { useNavigationContext } from "~/contexts/hooks"
import type { PageType } from "~/contexts/NavigationProvider/actionTypes"
import { useScrollContainer } from "~/layouts"

const tap = { scale: 0.7 }

interface Props {
  href: string
  iconName: ComponentProps<typeof Icon>["name"]
  pageTypes: PageType[]
  label: string
}

const NavIcon = ({ href, iconName, pageTypes, label = "이름" }: Props) => {
  const { scrollToTop } = useScrollContainer()
  const router = useRouter()
  const { navigationProps } = useNavigationContext()
  const { currentPage } = navigationProps
  const [isPageLoading, setIsPageLoading] = useState(false)
  const isClicked = useRef(false)

  useEffect(() => {
    Router.events.on("routeChangeComplete", () => setIsPageLoading(false))
    Router.events.on("routeChangeError", () => setIsPageLoading(false))
  }, [])

  const handleTap = async () => {
    if (!isClicked.current) {
      setIsPageLoading(true)
    }
    await router.push(href)

    isClicked.current = true
    scrollToTop()
  }

  return (
    <motion.a
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
      `}
      onTapStart={handleTap}
      whileTap={tap}
    >
      {isPageLoading ? (
        <Spinner w="16px" h="16px" />
      ) : (
        <VStack spacing="2px">
          <Icon
            name={iconName}
            color={
              pageTypes.some((item) => item === currentPage)
                ? "black"
                : "#cfcfcf"
            }
          />
          <span
            css={css`
              pointer-events: none;
              font-size: 10px;
              color: ${pageTypes.some((item) => item === currentPage)
                ? "black"
                : "#cfcfcf"};
            `}
          >
            {label}
          </span>
        </VStack>
      )}
    </motion.a>
  )
}

NavIcon.Favorites = () => (
  <NavIcon
    href="/"
    iconName="star"
    label="즐겨찾기"
    pageTypes={["PAGE_FAVORITES"]}
  />
)
NavIcon.Map = () => (
  <NavIcon
    href="/map"
    iconName="map"
    label="지도"
    pageTypes={["PAGE_MAP", "PAGE_RESERVATIONS_COURTS"]}
  />
)
NavIcon.Reservations = () => (
  <NavIcon
    href="/reservations"
    iconName="calendar"
    label="예약"
    pageTypes={["PAGE_RESERVATIONS"]}
  />
)
NavIcon.Chat = () => (
  <NavIcon
    href="/chat/list"
    iconName="message-circle"
    label="채팅"
    pageTypes={[
      "PAGE_USER_CHATROOM",
      "PAGE_COURT_CHATROOM",
      "PAGE_CHATROOM_LIST",
    ]}
  />
)
NavIcon.newCourt = () => (
  <NavIcon
    href="/admin/newcourts"
    iconName="check-square"
    label="새 농구장"
    pageTypes={["PAGE_ADMIN_NEWCOURTS"]}
  />
)
NavIcon.Login = () => (
  <NavIcon
    href="/login"
    iconName="log-in"
    label="로그인"
    pageTypes={["PAGE_LOGIN"]}
  />
)

export default NavIcon
