import styled from "@emotion/styled";
import type { SlotKeyUnion, SlotValueUnion } from "./types";

interface SlotItemProps {
  value: SlotKeyUnion;
  text: SlotValueUnion;
  checked: boolean;
}

const SlotItem: React.FC<SlotItemProps> = ({ value, text, checked }) => {
  return (
    <label style={{ marginRight: 10 }}>
      <StyledRadio
        type="radio"
        value={value}
        checked={checked}
        onChange={() => {}}
      />
      <span>{text}</span>
    </label>
  );
};

const StyledRadio = styled.input`
  display: none;

  & + span {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  &:checked + span {
    background-color: black;
    color: white;
  }
`;

export default SlotItem;
