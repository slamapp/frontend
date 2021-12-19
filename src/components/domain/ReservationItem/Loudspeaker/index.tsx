import { Button } from "@components/base";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

interface Iprops {
  startTime: string;
}

const ONE_HOUR_SECONDS = 3600;

// 확성기가 켜지기까지 남은 시간?
const getRestTimeBeforeActivate = (startTime: any) => {
  const timeDiff = new Date(startTime).getTime() - new Date().getTime();

  return timeDiff - ONE_HOUR_SECONDS * 1000;
};

const Loudspeaker = ({ startTime }: Iprops) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (new Date(startTime).getTime() < new Date().getTime()) {
      setIsActive(false);
    } else {
      const restTIme = getRestTimeBeforeActivate(startTime);

      const timerId = setTimeout(() => {
        setIsActive(true);
      }, restTIme);

      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }
  }, []);

  return <div>{isActive ? <StyledButton>🔈</StyledButton> : null}</div>;
};

const StyledButton = styled(Button)`
  width: ${({ theme }) => theme.buttonHeights.lg};
  height: ${({ theme }) => theme.buttonHeights.lg};
  background: ${({ theme }) => theme.colors.activeGradientColor};
`;

export default Loudspeaker;
