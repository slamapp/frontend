import type { ComponentPropsWithoutRef, ReactPortal } from "react"
import { useEffect, useState } from "react"
import type { Flex } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import ReactDOM from "react-dom"

const BottomFixedGradient = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Flex>) => {
  const theme = useTheme()

  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    setPortal(
      ReactDOM.createPortal(
        <>
          <Box
            w="100%"
            h="120px"
            pos="fixed"
            bottom={0}
            maxW="640px"
            zIndex={200000}
            background={`linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            ${theme.colors.white} 55%
            )`}
            pointerEvents="none"
            {...props}
          />
          <Box
            w="100%"
            pos="fixed"
            bottom={0}
            maxW="640px"
            zIndex={200000}
            {...props}
          >
            {children}
          </Box>
        </>,

        document.querySelector("#scrolled-container")!
      )
    )
  }, [children])

  return portal
}

export default BottomFixedGradient
