import type { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

type Props = {
  isOpen: boolean
  children: ReactNode
}

const BottomModal = ({ isOpen, children }: Props) => {
  return (
    <Box
      pos="sticky"
      bottom={0}
      left={0}
      right={0}
      bgColor="white"
      mt={`${isOpen ? -16 : 0}px`}
      h={`${isOpen ? "auto" : 0}px`}
      transition="height 100ms ease-in-out"
      boxShadow="0px 0px 16px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
      borderRadius="16px 16px 0 0"
    >
      {children}
    </Box>
  )
}

export default BottomModal
