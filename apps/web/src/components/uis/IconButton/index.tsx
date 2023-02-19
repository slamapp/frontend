import { ComponentProps, MouseEventHandler } from 'react'
import { Center } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import { Icon } from '~/components/uis'

interface Props extends ComponentProps<typeof Center> {
  icon: Pick<ComponentProps<typeof Icon>, 'name' | 'size' | 'color' | 'fill'>
  size?: 'sm' | 'md' | 'lg'
  type?: ComponentProps<typeof motion.button>['type']
  onClick?: MouseEventHandler<HTMLDivElement> & MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ icon, size = 'lg', type = 'button', onClick, ...props }: Props) => {
  const theme = useTheme()

  return (
    <Center
      as={motion.button}
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      type={type}
      onClick={onClick}
      border={`2px solid ${theme.colors.gray0100}`}
      borderRadius="16px"
      w={`${theme.sizes.buttonHeight[size]}`}
      h={`${theme.sizes.buttonHeight[size]}`}
      cursor="pointer"
      {...props}
    >
      <Icon {...icon} />
    </Center>
  )
}

export default IconButton
