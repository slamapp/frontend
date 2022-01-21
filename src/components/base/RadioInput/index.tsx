import type { ChangeEvent, ReactNode } from "react";
import RadioItem from "./RadioItem";

interface Props {
  children: ReactNode;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ children, onChange, className }: Props) => {
  return (
    <div onChange={onChange} className={className}>
      {children}
    </div>
  );
};

export default {
  Group: RadioGroup,
  Item: RadioItem,
};
