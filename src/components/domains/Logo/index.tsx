import React from "react"
import styled from "@emotion/styled"
import Lottie from "react-lottie"
import * as animationData from "../../../../public/assets/lottie/basketball.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

interface Props {
  width?: number
}

const Logo = ({ width = 82 }: Props) => {
  return (
    <LogoWrapper width={width}>
      <LogoText width={width}>Slam</LogoText>
      <LottieWrapper width={width}>
        <Lottie options={defaultOptions} width={width * 0.16} />
      </LottieWrapper>
    </LogoWrapper>
  )
}

export default Logo

const LogoWrapper = styled.span<{ width: number }>`
  width: ${({ width }) => width}px;
  display: flex;
  align-items: center;
`

const LogoText = styled.span<{ width: number }>`
  font-size: ${({ width }) => width * 0.36}px;
  margin-left: ${({ width }) => width * 0.02}px;
  font-family: "Righteous", sans-serif;
  font-weight: 900;
  margin-right: ${({ width }) => width * 0.02}px;
`

const LottieWrapper = styled.div<{ width: number }>`
  margin-bottom: ${({ width }) => -width * 0.1}px;
`
