import type { ChangeEvent, ReactNode } from "react";
import RadioItem from "./RadioItem";

interface Props {
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ children, onChange }: Props) => {
  return <div onChange={onChange}>{children}</div>;
};

export default {
  Group: RadioGroup,
  Item: RadioItem,
};
