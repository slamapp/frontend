import type { ComponentProps } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Flex } from "@chakra-ui/react"
import NavIcon from "./NavIcon"

const navIconPropsList: ComponentProps<typeof NavIcon>[] = [
  {
    label: "즐겨찾기",
    href: "/",
    iconName: "star",
  },
  {
    label: "지도",
    href: "/map",
    iconName: "map",
  },
  {
    label: "채팅",
    href: "/chat/list",
    iconName: "message-circle",
  },
  {
    label: "예약",
    href: "/reservations",
    iconName: "calendar",
  },
]

const BottomNavigation = () => {
  const router = useRouter()
  const [activePathname, setActivePathname] = useState(() => router.pathname)

  useEffect(() => {
    setActivePathname(router.pathname)
  }, [router.pathname])

  return (
    <Flex
      as="nav"
      pos="sticky"
      background="white"
      bottom={0}
      left={0}
      right={0}
      zIndex={2000}
    >
      <Flex justify="space-around" align="center" mx="16px" h="52px" w="100%">
        {navIconPropsList.map((navIconProps) => (
          <NavIcon
            key={navIconProps.iconName}
            {...navIconProps}
            isActive={navIconProps.href === activePathname}
            onTap={(href) => setActivePathname(href)}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default BottomNavigation
