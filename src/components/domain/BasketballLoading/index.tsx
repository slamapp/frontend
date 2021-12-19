import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import LoaderBasketball from "./LoaderBasketball";

interface Props {
  children?: ReactNode;
}

const BasketballLoading: FC<Props> = ({ children }) => {
  const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: ${({ theme }) => theme.colors.white};
  `;

  return (
    <LoadingWrapper>
      <LoaderBasketball />
      {children}
    </LoadingWrapper>
  );
};

export default BasketballLoading;
