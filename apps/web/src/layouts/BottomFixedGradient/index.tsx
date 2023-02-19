import type { ComponentPropsWithoutRef, ReactPortal } from 'react'
import { useEffect, useState } from 'react'
import type { Flex } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { useScrollContainer } from '~/layouts'

const BottomFixedGradient = ({ children }: ComponentPropsWithoutRef<typeof Flex>) => {
  const theme = useTheme()
  const scrollContainer = useScrollContainer()

  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    setPortal(
      ReactDOM.createPortal(
        <>
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            w={`${scrollContainer.width}px`}
            h="120px"
            pos="fixed"
            bottom={0}
            maxW="640px"
            background={`linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            ${theme.colors.white} 55%
            )`}
            pointerEvents="none"
          />
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            w={`${scrollContainer.width}px`}
            pos="fixed"
            bottom={0}
            maxW="640px"
            zIndex={1}
          >
            {children}
          </Box>
        </>,
        scrollContainer.ref.current!
      )
    )
  }, [children, scrollContainer.width, scrollContainer.ref, theme.colors.white])

  return portal
}

export default BottomFixedGradient
