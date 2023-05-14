import type { ComponentProps, MouseEventHandler } from 'react'
import { useTheme } from '@emotion/react'
import { Flex } from '@jsxcss/emotion'
import { motion } from 'framer-motion'
import { Icon } from '~/components/uis'

interface Props extends ComponentProps<typeof Flex.Center> {
  icon: Pick<ComponentProps<typeof Icon>, 'name' | 'size' | 'color' | 'fill'>
  size?: 'sm' | 'md' | 'lg'
  type?: ComponentProps<typeof motion.button>['type']
  onClick?: MouseEventHandler<HTMLDivElement> & MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ icon, size = 'lg', type = 'button', onClick, ...props }: Props) => {
  const theme = useTheme()

  return (
    <Flex.Center
      as={motion.button}
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      type={type}
      onClick={onClick}
      border={`2px solid ${theme.colors.gray0100}`}
      borderRadius={16}
      width={`${theme.sizes.buttonHeight[size]}`}
      height={`${theme.sizes.buttonHeight[size]}`}
      cursor="pointer"
      {...props}
    >
      <Icon {...icon} />
    </Flex.Center>
  )
}

export default IconButton
