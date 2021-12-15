import styled from "@emotion/styled";

interface RadioItemProps {
  value: string;
  text: string;
  checked: boolean;
}

const RadioItem: React.FC<RadioItemProps> = ({ value, text, checked }) => {
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

export default RadioItem;
