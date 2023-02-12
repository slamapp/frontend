import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import { EmotionTheme } from '~/styles/emotionTheme'

interface Props
  extends Partial<Pick<ComponentPropsWithoutRef<typeof Flex>, 'onClick' | 'style'>>,
    Pick<ComponentPropsWithoutRef<typeof motion.button>, 'initial' | 'animate' | 'disabled' | 'type'> {
  size?: keyof EmotionTheme['sizes']['buttonHeight'] | number
  scheme?: keyof EmotionTheme['scheme']['buttons']
  loading?: boolean
  fullWidth?: boolean
  children?: ReactNode
}

const Button = ({
  size = 'md',
  scheme = 'black',
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props
}: Props) => {
  const theme = useTheme()

  const height = typeof size === 'string' ? theme.sizes.buttonHeight[size] : size

  const selectedScheme = theme.scheme.buttons[scheme]

  return (
    <Flex
      as={motion.button}
      type="button"
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      justify="center"
      align="center"
      gap="6px"
      h={height}
      w={fullWidth ? '100%' : undefined}
      px="18px"
      whiteSpace="nowrap"
      borderRadius="16px"
      fontWeight="bold"
      transition="background-color 200ms"
      disabled={disabled}
      opacity={disabled ? 0.7 : undefined}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...selectedScheme}
      {...props}
    >
      {loading && <Spinner />} {props.children}
    </Flex>
  )
}

export default Button
