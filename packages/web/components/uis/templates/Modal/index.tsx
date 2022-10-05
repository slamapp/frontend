import type { ReactNode } from "react"
import { useMemo } from "react"
import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { createRoot } from "react-dom/client"
import { useClickAway, useIsomorphicLayoutEffect } from "~/hooks"
import emotionTheme from "~/styles/emotionTheme"

interface Props {
  children?: ReactNode
  width?: number
  height?: number
  visible?: boolean
  onClose?: () => void
  [x: string]: any
}

const Modal = ({
  children,
  width = 500,
  maxWidth,
  height,
  visible = false,
  onClose = () => {},
  ...props
}: Props) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose()
  })

  const containerStyle = useMemo(
    () => ({ width, maxWidth, height }),
    [width, maxWidth, height]
  )

  const { root, el } = useMemo(() => {
    let el = null
    let root = null
    if (typeof document !== "undefined") {
      el = document.createElement("div")
      root = createRoot(el)
    }

    return { root, el }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (el) {
      document.body.appendChild(el)
    }

    return () => {
      if (el) {
        document.body.removeChild(el)
      }
    }
  })

  return (
    root?.render(
      <ThemeProvider theme={emotionTheme}>
        <BackgroundDim style={{ display: visible ? "block" : "none" }}>
          <ModalContainer
            ref={ref}
            {...props}
            style={{ ...props.style, ...containerStyle }}
          >
            {children}
          </ModalContainer>
        </BackgroundDim>
      </ThemeProvider>
    ) || <></>
  )
}

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.lg};
`

export default Modal
