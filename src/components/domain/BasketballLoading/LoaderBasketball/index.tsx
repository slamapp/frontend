import styled from "@emotion/styled";
import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../../../../public/assets/lottie/loader-basketball.json";

const defaultOptions = {
  animationData,
};

const LoaderBasketball = () => {
  return (
    <LottieWrapper>
      <Lottie options={defaultOptions} />
    </LottieWrapper>
  );
};

export default LoaderBasketball;

const LottieWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
`;
