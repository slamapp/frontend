import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Button, Spacer, Text } from "@components/base";
import { LinkAvatar } from "@components/domain";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  src: string;
  isFollowed?: boolean;
  userId?: number;
}
// 아바타 + 이름 + 버튼

const FollowListItem: React.FC<Props> = ({
  children,
  className,
  style,
  src,
  isFollowed,
  userId,
}) => {
  return (
    <ListItem className={className} style={style}>
      <Spacer
        gap={10}
        style={{
          alignItems: "center",
        }}
      >
        <LinkAvatar size={36} imageUrl={src} userId={userId} />
        <Text size="base" strong>
          {children}
        </Text>
      </Spacer>
      <div>
        {isFollowed === undefined ? (
          <></>
        ) : isFollowed ? (
          // TODO: 컨텍스트 함수로 대체
          <Button onClick={() => {}} secondary>
            팔로잉
          </Button>
        ) : (
          // TODO: 컨텍스트 함수로 대체
          <Button onClick={() => {}}>팔로우</Button>
        )}
      </div>
    </ListItem>
  );
};

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
`;

export default FollowListItem;
