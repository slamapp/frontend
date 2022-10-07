import type { ReactNode } from "react"
import { Box, Text } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"

type Props = {
  children: ReactNode
}

const Address = ({ children }: Props) => {
  const theme = useTheme()

  return (
    <Box h="50px">
      <Text
        color={theme.colors.gray0700}
        css={css`
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        `}
      >
        {children}
      </Text>
    </Box>
  )
}

export default Address
