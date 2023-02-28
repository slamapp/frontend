import { css } from '@emotion/react'
import { Box, Stack } from '@jsxcss/emotion'
import { motion } from 'framer-motion'

const boxStyle = css`
  width: 100px;
  height: 100px;
  background-color: red;
`

const Test = () => {
  return (
    <>
      <Stack.Vertical as={motion.div} whileTap={{ scale: 0.8 }}>
        <Box css={boxStyle} />
        <Box css={boxStyle} />
        <Box css={boxStyle} />
      </Stack.Vertical>
    </>
  )
}

export default Test
