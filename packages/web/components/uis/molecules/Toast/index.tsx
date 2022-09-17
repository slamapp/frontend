import { css, ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import Toast from "~/libs/Toast"
import emotionTheme from "~/styles/emotionTheme"

const badge = {
  success: "✅",
  error: "⛔️",
  warning: "🚧",
  info: "ⓘ",
} as const

interface ExtraOptions {
  isShowProgressBar?: boolean
  isShowClose?: boolean
}

export default new Toast<ExtraOptions>({
  defaultOptions: { duration: 4000, delay: 100, status: "info" },
  Adapter: ({ children }) => (
    <ThemeProvider theme={emotionTheme}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </ThemeProvider>
  ),
  Template: ({
    content,
    isShow,
    options: {
      delay,
      duration,
      status,
      isShowClose = true,
      isShowProgressBar = false,
    },
    close,
  }) => {
    return (
      <AnimatePresence exitBeforeEnter>
        {isShow && (
          <motion.div
            layout
            style={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "0 0 16px 0",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: delay / 1000 },
            }}
            exit={{
              y: -20,
              opacity: 0,
              transition: { duration: delay / 1000 },
            }}
          >
            <Container>
              {isShowProgressBar && (
                <ProgressBar style={{ animationDuration: `${duration}ms` }} />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                {status && badge[status]}
                <div
                  css={css`
                    flex: 1;
                    padding: 16px;
                  `}
                >
                  {content}
                </div>
                {isShowClose && (
                  <div
                    css={css`
                      width: 10px;
                      cursor: pointer;
                    `}
                    onClick={close}
                  >
                    ×
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
})

const Container = styled(motion.div)`
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 32px -16px rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
`

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.blue0500};
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`
