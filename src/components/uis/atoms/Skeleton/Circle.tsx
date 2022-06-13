import styled from "@emotion/styled";
import Base from "./Base";

interface Props {
  size: number | string;
}

const Circle = styled(Base)<Props>`
  width: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  border-radius: 50%;
`;

export default Circle;
