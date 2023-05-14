import { css } from '@emotion/react'
import { Box, Flex } from '@jsxcss/emotion'

export const Spinner = () => (
  <Flex.Center position="relative" width={20} height={20}>
    <Box
      position="absolute"
      width={20}
      height={20}
      boxSizing="border-box"
      border="2px solid transparent"
      borderRadius="50%"
      borderTopColor="black"
      borderBottomColor="black"
      borderLeftColor="black"
      margin="-10px 0 0 -10px"
      top="50%"
      left="50%"
      css={css`
        animation: spinner 0.4s linear infinite;

        @keyframes spinner {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    />
  </Flex.Center>
)
