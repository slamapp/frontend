import { HTMLAttributes, useState, FocusEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  block?: boolean;
  isRequired?: boolean;
  [x: string]: any;
}

const Input = ({ label, block, isRequired, type, ...props }: Props) => {
  const [isFocus, setFocus] = useState(false);

  const handleToggle = () => {
    setFocus(!isFocus);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
    handleToggle();
  };

  return (
    <div>
      <label>
        <StyledText block={block} strong>
          {label}
          {isRequired ? <RequiredTag>*</RequiredTag> : null}
        </StyledText>
        <Container
          className={isFocus ? "focus" : ""}
          style={type === "number" ? { display: "flex" } : {}}
        >
          <InputContent
            {...props}
            type={type}
            onFocus={handleFocus}
            onBlur={handleToggle}
            style={type === "number" ? { textAlign: "right" } : {}}
          />
          {type === "number" ? <Text strong>개</Text> : null}
        </Container>
      </label>
    </div>
  );
};

export default Input;

const Container = styled.div`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100%;
    background-color: ${theme.colors.white};
    padding: ${theme.buttonPaddings.lg};
    border-radius: ${theme.borderRadiuses.lg};
    border: 1px solid ${theme.colors.gray300};
    margin-top: ${theme.gaps.xs};

    &.focus {
      border: 1px solid ${theme.colors.slam.orange.strong};
    }
  `}
`;

const InputContent = styled.input`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100%;
    color: ${theme.colors.gray900};
    font-weight: bold;
    border: none;

    &::placeholder {
      color: ${theme.colors.gray300};
    }

    &:focus {
      outline: none;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  `}
`;

const StyledText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.gray900};
  `}
`;

const RequiredTag = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.slam.orange.strong};
    vertical-align: text-top;
  `}
`;
