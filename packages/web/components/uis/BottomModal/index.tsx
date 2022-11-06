import type { ReactNode } from "react"
import { Box } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"

type Props = {
  isOpen?: boolean
  children: ReactNode
}

const BottomModal = ({ isOpen = true, children }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Box
          as={motion.div}
          layout
          pos="sticky"
          bottom={0}
          left={0}
          right={0}
          bgColor="white"
          mt={`${isOpen ? -16 : 0}px`}
          h="auto"
          transition="height 100ms ease-in-out"
          boxShadow="0px 0px 16px rgba(0, 0, 0, 0.3)"
          overflow="hidden"
          borderRadius="16px 16px 0 0"
        >
          {children}
        </Box>
      )}
    </AnimatePresence>
  )
}

export default BottomModal
