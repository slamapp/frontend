import { HTMLAttributes } from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  block?: boolean;
  [x: string]: any;
}

const Input = ({ label, block, ...props }: Props) => (
  <div>
    <label>
      <Text block={block}>{label}</Text>
      <input {...props}></input>
    </label>
  </div>
);

export default Input;
