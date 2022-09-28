import { Spinner } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { AnimatePresence, motion } from "framer-motion"

type Props = { isLoading: boolean }

const LoadingIndicator = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      )}
    </>
  )
}

export default LoadingIndicator
