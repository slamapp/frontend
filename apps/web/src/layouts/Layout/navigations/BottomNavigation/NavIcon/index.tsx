import type { ComponentProps } from 'react'
import { useRouter } from 'next/router'
import { css, useTheme } from '@emotion/react'
import { Stack } from '@jsxcss/emotion'
import { motion } from 'framer-motion'
import { Icon } from '~/components/uis'

const tap = { scale: 0.7 }

interface Props {
  href: string
  iconName: ComponentProps<typeof Icon>['name']
  label: string
  isActive?: boolean
  onTap?: (href: string) => void
}

const NavIcon = ({ href, iconName, label = '이름', isActive, onTap }: Props) => {
  const router = useRouter()
  const theme = useTheme()
  const color = isActive ? theme.colors.black : theme.colors.gray0500

  const handleTap = async () => {
    onTap?.(href)
    await router.push(href)
  }

  return (
    <motion.a
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
      `}
      onTapStart={handleTap}
      whileTap={tap}
    >
      <Stack.Vertical align="center" spacing={2}>
        <Icon name={iconName} color={color} />
        <span
          css={css`
            color: ${color};
            font-size: 10px;
            pointer-events: none;
          `}
        >
          {label}
        </span>
      </Stack.Vertical>
    </motion.a>
  )
}

export default NavIcon
