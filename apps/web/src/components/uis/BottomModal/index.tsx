import type { ReactNode } from 'react'
import { Box } from '@jsxcss/emotion'

type Props = {
  isOpen?: boolean
  children: ReactNode
}

const BottomModal = ({ isOpen = true, children }: Props) =>
  isOpen ? (
    <Box
      position="sticky"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="white"
      height="auto"
      boxShadow="0px 0px 16px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
    >
      {children}
    </Box>
  ) : null

export default BottomModal
