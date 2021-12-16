import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Avatar, Text } from "@components/base";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  src: string;
}

const FollowList: React.FC<Props> = ({ children, className, style, src }) => {
  return (
    <List className={className} style={style}>
      <Avatar shape="circle" size={36} src={src} />
      <Text size="base" strong>
        {children}
      </Text>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export default FollowList;
