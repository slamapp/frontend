import type { ComponentPropsWithoutRef, ReactPortal } from "react"
import { useEffect, useState } from "react"
import type { Flex } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import { motion } from "framer-motion"
import ReactDOM from "react-dom"
import { useScrollContainer } from "~/layouts"

const BottomFixedGradient = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Flex>) => {
  const theme = useTheme()
  const { scrollContainerWidth, scrollContainerRef } = useScrollContainer()

  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    setPortal(
      ReactDOM.createPortal(
        <>
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            w={`${scrollContainerWidth}px`}
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
            {...props}
          />
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            w={`${scrollContainerWidth}px`}
            pos="fixed"
            bottom={0}
            maxW="640px"
            zIndex={1}
            {...props}
          >
            {children}
          </Box>
        </>,
        scrollContainerRef.current!
      )
    )
  }, [
    children,
    scrollContainerWidth,
    props,
    scrollContainerRef,
    theme.colors.white,
  ])

  return portal
}

export default BottomFixedGradient
