import type { ComponentProps } from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { Router, useRouter } from "next/router"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Icon, Spacer, Spinner } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import type { PageType } from "~/contexts/NavigationProvider/actionTypes"

const tap = { scale: 0.7 }

interface Props {
  href: string
  iconName: ComponentProps<typeof Icon>["name"]
  pageTypes: PageType[]
  label: string
}

const NavIcon = ({ href, iconName, pageTypes, label = "이름" }: Props) => {
  const router = useRouter()
  const { navigationProps } = useNavigationContext()
  const { currentPage } = navigationProps
  const [isPageLoading, setIsPageLoading] = useState(false)
  const isClicked = useRef(false)

  useEffect(() => {
    Router.events.on("routeChangeComplete", () => setIsPageLoading(false))
    Router.events.on("routeChangeError", () => setIsPageLoading(false))
  }, [])

  const handleTap = useCallback(() => {
    if (!isClicked.current) {
      setIsPageLoading(true)
    }
    router.push(href)

    isClicked.current = true
  }, [href, router])

  return (
    <S.MotionAnchor onTapStart={handleTap} whileTap={tap}>
      {isPageLoading ? (
        <Spinner size={16} />
      ) : (
        <Spacer align="center" gap={2}>
          <Icon
            name={iconName}
            size={18}
            color={
              pageTypes.some((item) => item === currentPage)
                ? "black"
                : "#cfcfcf"
            }
          />
          <S.Text
            style={{
              color: pageTypes.some((item) => item === currentPage)
                ? "black"
                : "#cfcfcf",
              fontSize: 10,
            }}
          >
            {label}
          </S.Text>
        </Spacer>
      )}
    </S.MotionAnchor>
  )
}

const S = {
  MotionAnchor: styled(motion.a)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
  `,

  Text: styled.span`
    pointer-events: none;
  `,
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
