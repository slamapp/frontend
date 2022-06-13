import styled from "@emotion/styled";
import useToggle from "~/hooks/useToggle";

interface Props {
  name: string;
  on: boolean;
  disabled: boolean;
  onChange: () => void;
}

const Toggle = ({
  name,
  on = false,
  disabled = false,
  onChange,
  ...props
}: Props) => {
  const [checked, toggle] = useToggle(on);

  const handleChange = () => {
    toggle();
    onChange();
  };

  return (
    <ToggleContainer {...props}>
      <ToggleInput
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 54px;
  height: 30px;
  padding: 3px;
  border-radius: 15px;
  background-color: #ccc;
  transition: background-color 150ms;
  box-sizing: border-box;

  &:after {
    content: "";
    position: relative;
    left: 0;
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: white;
    transition: left 150ms;
  }
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + div {
    background: lightgreen;
    &:after {
      left: calc(100% - 25px);
    }
  }
  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;

    &:after {
      opacity: 0.7;
    }
  }
`;
