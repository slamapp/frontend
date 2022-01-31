import styled from "@emotion/styled";
import type { CSSProperties } from "react";

type Size = "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl" | "xxl";
interface Props {
  gap: Size | number;
  type?: "vertical" | "horizontal";
  style?: CSSProperties;
}

const Spacer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ type }) => type === "vertical" && "column"};
  gap: ${({ theme, gap }) =>
    typeof gap === "string" ? theme.gaps[gap] : `${gap}px`};
`;

export default Spacer;
