import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  isOpen?: boolean
  children: ReactNode
}

const BottomModal = ({ isOpen = true, children }: Props) =>
  isOpen ? (
    <Box
      pos="sticky"
      bottom={0}
      left={0}
      right={0}
      bgColor="white"
      h="auto"
      boxShadow="0px 0px 16px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
    >
      {children}
    </Box>
  ) : null

export default BottomModal
