import React from "react"
import styled from "@emotion/styled"
import Lottie from "react-lottie"
import * as animationData from "../../../../../public/assets/lottie/loader-basketball.json"

const defaultOptions = {
  animationData,
}

const LoaderBasketball = () => {
  return (
    <LottieWrapper>
      <Lottie options={defaultOptions} />
    </LottieWrapper>
  )
}

export default LoaderBasketball

const LottieWrapper = styled.div`
  width: 150px;
  height: 150px;
  z-index: 1;
`
