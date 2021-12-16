import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Avatar, Button, Text } from "@components/base";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  src: string;
  isFollowed: boolean;
}
// 아바타 + 이름 + 버튼

const FollowListItem: React.FC<Props> = ({
  children,
  className,
  style,
  src,
  isFollowed,
}) => {
  return (
    <List className={className} style={style}>
      <Avatar shape="circle" size={36} src={src} />
      <Text size="base" strong>
        {children}
      </Text>
      <div>
        {isFollowed ? (
          // TODO: 컨텍스트 함수로 대체
          <Button onClick={() => {}} secondary>
            팔로잉
          </Button>
        ) : (
          // TODO: 컨텍스트 함수로 대체
          <Button onClick={() => {}}>팔로우</Button>
        )}
      </div>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export default FollowListItem;
