import type { ChangeEvent, ReactNode } from "react";
import styled from "@emotion/styled";
import RadioItem from "./RadioItem";

interface Props {
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ children, onChange }: Props) => {
  return <Container onChange={onChange}>{children}</Container>;
};

export default {
  Group: RadioGroup,
  Item: RadioItem,
};

const Container = styled.div`
  display: block;
`;
