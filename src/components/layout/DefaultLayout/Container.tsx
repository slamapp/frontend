import styled from "@emotion/styled";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  return <StyledContainer height={height}>{children}</StyledContainer>;
};

export default Container;

const StyledContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  max-width: 640px;
  margin: auto;
  background-color: #fafafa;
  height: ${({ height }) => `${height}`}px;
  transition: height 200ms;
`;
