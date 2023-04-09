import { css } from '@emotion/react'
import { AutoLayout, Box, Stack } from '@jsxcss/emotion'
import { motion } from 'framer-motion'

const boxStyle = css`
  width: 100px;
  height: 100px;
  background-color: red;
`

const Test = () => {
  return (
    <AutoLayout direction="horizontal" space={30} spacingMode="space-between">
      <Stack.Vertical as={motion.div} whileTap={{ scale: 0.8 }}>
        <Box css={boxStyle} />
        <Box css={boxStyle} />
        <Box css={boxStyle} />
      </Stack.Vertical>
      <Stack.Vertical as={motion.div} whileTap={{ scale: 0.8 }}>
        <Box css={boxStyle} />
        <Box css={boxStyle} />
        <Box css={boxStyle} />
      </Stack.Vertical>
      <Stack.Vertical as={motion.div} whileTap={{ scale: 0.8 }}>
        <Box css={boxStyle} />
        <Box css={boxStyle} />
        <Box css={boxStyle} />
      </Stack.Vertical>
    </AutoLayout>
  )
}

export default Test
