import type { ComponentProps } from "react"
import { useRouter } from "next/router"
import { VStack } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import { motion } from "framer-motion"
import { Icon } from "~/components/uis"
import { useScrollContainer } from "~/layouts"

const tap = { scale: 0.7 }

interface Props {
  href: string
  iconName: ComponentProps<typeof Icon>["name"]
  label: string
  isActive?: boolean
  onTap?: (href: string) => void
}

const NavIcon = ({
  href,
  iconName,
  label = "이름",
  isActive,
  onTap,
}: Props) => {
  const { scrollToTop } = useScrollContainer()
  const router = useRouter()
  const theme = useTheme()
  const color = isActive ? theme.colors.black : theme.colors.gray0500

  const handleTap = async () => {
    onTap?.(href)
    await router.push(href)
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
      <VStack spacing="2px">
        <Icon name={iconName} color={color} />
        <span
          css={css`
            pointer-events: none;
            font-size: 10px;
            color: ${color};
          `}
        >
          {label}
        </span>
      </VStack>
    </motion.a>
  )
}

export default NavIcon
