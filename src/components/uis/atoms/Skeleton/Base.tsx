import { css } from "@emotion/react"
import styled from "@emotion/styled"

const Base = styled.div`
  ${({ theme }) => css`
    background-image: linear-gradient(
      90deg,
      ${theme.colors.gray0100} 0px,
      ${theme.colors.gray0050} 40px,
      ${theme.colors.gray0100} 80px
    );
  `}

  display: inline-block;
  border-radius: 4px;
  background-size: 200% 200%;
  background-position: 0 center;
  animation: skeleton--zoom-in 0.2s ease-out,
    skeleton--loading 1s infinite linear;

  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes skeleton--loading {
    0% {
      background-position-x: 100%;
    }
    50% {
      background-position-x: 0%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`

export default Base
