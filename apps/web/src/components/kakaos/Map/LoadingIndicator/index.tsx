import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { Spinner } from '~/components/common'

const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    css={css`
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `}
  >
    <Spinner />
  </motion.div>
)

export default LoadingIndicator
