import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../../public/assets/lottie/basketball.json";

const width = 13;
const delay = 200;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

interface Props {
  isShow: boolean;
}

const AuthLoading = ({ isShow }: Props) => {
  const [isDisplay, setIsDisplay] = useState(true);

  const getHeight = (width: number) => width * 1.32;

  useEffect(() => {
    if (!isShow) {
      setTimeout(() => setIsDisplay(false), delay);
    }
  }, [isShow]);

  return isDisplay ? (
    <LoadingContainer isShow={isShow}>
      <LogoWrapper>
        <LogoText>Slam</LogoText>
        <Lottie
          options={defaultOptions}
          height={getHeight(width)}
          width={width}
        />
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
  transition: all ${delay}ms ease-out;
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
  margin-bottom: 6px;
  margin-right: 2px;
`;

export default AuthLoading;
