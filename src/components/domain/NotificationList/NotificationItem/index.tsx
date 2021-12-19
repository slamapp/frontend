import React from "react";
import { Notification } from "@contexts/AuthProvider/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { LinkStrong, Spacer } from "@components/base";
import { LinkAvatar } from "@components/domain";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  notification: Notification;
}

const NotificationItem = ({ notification }: Props) => {
  const { createdAt, isClicked, isRead } = notification;
  const date = new Date(createdAt);
  const fromCreatedAt = dayjs(date).locale("ko").fromNow();

  return (
    <NotificationItemContainer>
      {getNotificationMarkUp(notification)}
      {fromCreatedAt}
      {isClicked ? "클릭됨" : "클릭안됨"}
      {isRead ? "읽음" : "안 읽음"}
    </NotificationItemContainer>
  );
};
export default NotificationItem;

const getNotificationMarkUp = ({
  type,
  loudSpeakerInfo,
  followerInfo,
}: Notification) => {
  switch (type) {
    case "FOLLOWING":
      return (
        <Spacer gap={6} style={{ alignItems: "center" }}>
          <LinkAvatar
            userId={followerInfo!.userId}
            imageUrl={followerInfo!.userImage}
          />
          <div>
            <LinkStrong href={`user/${followerInfo!.userId}`}>
              {followerInfo!.userNickname}
            </LinkStrong>
            님이 팔로우 했습니다.
          </div>
        </Spacer>
      );
      break;

    case "LOUDSPEAKER":
      return <>{type}</>;
      break;

    default:
      break;
  }
};

const NotificationItemContainer = styled.div`
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 12px;
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadiuses.sm};
  `}
`;
