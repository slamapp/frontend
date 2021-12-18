import { Button, Icon, Image, Spacer, Text } from "@components/base";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { CSSProperties } from "react";

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  style?: CSSProperties;
}

const NoItemMessage = ({ title, description, buttonTitle, style }: Props) => {
  return (
    <WrapperSpacer gap="base" type="vertical" style={style}>
      <Image
        width={70}
        height={70}
        src="assets/basketball/only_ball_500.gif"
        alt="basketball"
      />
      <Spacer gap="xxs" type="vertical" style={{ textAlign: "center" }}>
        <Text size="md" block strong>
          {title}
        </Text>
        <TextGray size="xs">{description}</TextGray>
      </Spacer>
      <Link href="/courts" passHref>
        <SearchButton fullWidth>
          <SearchIcon name="compass" size="sm" color="white" />
          {buttonTitle}
        </SearchButton>
      </Link>
    </WrapperSpacer>
  );
};

export default NoItemMessage;

const TextGray = styled(Text)`
  color: ${({ theme }) => theme.colors.gray500};
`;

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`;

const WrapperSpacer = styled(Spacer)`
  height: 80%;
  align-items: center;
  justify-content: center;
`;
