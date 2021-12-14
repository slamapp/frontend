import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Lottie from "react-lottie";
import { useAuthContext } from "@contexts/hooks";
import * as animationData from "../../../public/assets/lottie/basketball.json";

const WIDTH = 13;
const FADE_OUT_TIME_MS = 400;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const AuthLoading = () => {
  const { authProps } = useAuthContext();
  const { isLoading } = authProps;

  const [isDisplay, setIsDisplay] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setIsDisplay(true);
    } else {
      setTimeout(() => setIsDisplay(false), FADE_OUT_TIME_MS);
    }
  }, [isLoading]);

  return isDisplay ? (
    <LoadingContainer isShow={isLoading}>
      <LogoWrapper>
        <LogoText>Slam</LogoText>
        <Lottie options={defaultOptions} width={WIDTH} />
      </LogoWrapper>
    </LoadingContainer>
  ) : (
    <></>
  );
};

const LoadingContainer = styled.div<{ isShow: boolean }>`
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);

  // 애니메이션
  transition: all ${FADE_OUT_TIME_MS}ms ease-out;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.span`
  font-size: 30px;
  font-family: "Righteous", sans-serif;
  font-weight: 900;
  margin-bottom: 13px;
  margin-right: 2px;
`;

export default AuthLoading;
