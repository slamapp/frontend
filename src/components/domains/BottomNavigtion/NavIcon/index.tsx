import type { ComponentProps } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Icon } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import type { PageType } from "~/contexts/NavigationProvider/actionTypes"

interface Props {
  href: string
  iconName: ComponentProps<typeof Icon>["name"]
  pageTypes: PageType[]
}

const NavIcon = ({ href, iconName, pageTypes }: Props) => {
  const { navigationProps } = useNavigationContext()
  const { currentPage } = navigationProps

  return (
    <Link href={href} key={href} passHref>
      <S.MotionAnchor whileTap={{ scale: 0.7 }}>
        <Icon
          name={iconName}
          size={24}
          color={
            pageTypes.some((item) => item === currentPage) ? "black" : "#cfcfcf"
          }
        />
      </S.MotionAnchor>
    </Link>
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
}

NavIcon.Favorites = () => (
  <NavIcon href="/" iconName="star" pageTypes={["PAGE_FAVORITES"]} />
)
NavIcon.Map = () => (
  <NavIcon
    href="/courts"
    iconName="map"
    pageTypes={["PAGE_MAP", "PAGE_RESERVATIONS_COURTS"]}
  />
)
NavIcon.Reservations = () => (
  <NavIcon
    href="/reservations"
    iconName="calendar"
    pageTypes={["PAGE_RESERVATIONS"]}
  />
)
NavIcon.Chat = () => (
  <NavIcon
    href="/chat/list"
    iconName="message-circle"
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
    pageTypes={["PAGE_ADMIN_NEWCOURTS"]}
  />
)
NavIcon.Login = () => (
  <NavIcon href="/login" iconName="log-in" pageTypes={["PAGE_LOGIN"]} />
)

export default NavIcon
