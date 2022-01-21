import { Text } from "@components/base";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  errors: any;
  value?: string;
  limit?: number;
  hasCount?: boolean;
}

const ValidationNoticeBar = ({
  value,
  limit,
  hasCount = false,
  errors,
}: Props) => {
  return (
    <Container>
      {hasCount ? (
        <LetterCount
          size="sm"
          strong
          className={value!.length > limit! ? "error" : ""}
        >
          {value!.length}/{limit}
        </LetterCount>
      ) : null}
      <ErrorMessage size="sm">
        {hasCount
          ? errors ??
            (value!.length > limit! ? "제한 글자 수를 넘었습니다." : "")
          : errors}
      </ErrorMessage>
    </Container>
  );
};

export default ValidationNoticeBar;

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: ${theme.gaps.xxs};
    color: ${theme.colors.gray900};
  `}
`;

const LetterCount = styled(Text)`
  ${({ theme }) => css`
    &.error {
      color: ${theme.colors.red.strong};
    }
  `}
`;

const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    text-align: right;
    flex-grow: 1;
    color: ${theme.colors.red.strong};
  `}
`;
