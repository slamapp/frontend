import type { ComponentPropsWithoutRef, ReactPortal } from "react"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import ReactDOM from "react-dom"

const BottomFixedGradient = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Box>) => {
  const theme = useTheme()

  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    setPortal(
      ReactDOM.createPortal(
        <Box
          css={css`
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 120px;
            background: ${`linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${theme.colors.white} 55%)`};
            max-width: 640px;
          `}
          {...props}
        >
          <Box w="100%">{children}</Box>
        </Box>,
        document.querySelector("#scrolled-container")!
      )
    )
  }, [])

  return portal
}

export default BottomFixedGradient
