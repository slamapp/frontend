import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"

type Props = {
  size?: number
}
const Spinner = ({ size = 24 }: Props) => {
  const theme = useTheme()

  return (
    <div
      css={css`
        border: 3px solid ${theme.colors.gray0900};
        border-top: 3px solid transparent;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        animation: spin 1s linear infinite;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    />
  )
}

const FullPage = () => (
  <Background>
    <Spinner />
  </Background>
)

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`

Spinner.FullPage = FullPage

export default Spinner
