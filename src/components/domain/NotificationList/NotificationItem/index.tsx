import React from "react";
import { Notification } from "@contexts/AuthProvider/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Avatar, LinkStrong } from "@components/base";
import { LinkAvatar } from "@components/domain";

interface Props {
  notification: Notification;
}

const getNotificationMarkUp = ({
  type,
  notificationId,
  loudSpeakerInfo,
  followerInfo,
}: Notification) => {
  switch (type) {
    case "FOLLOW":
      return (
        <>
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
        </>
      );
      break;

    case "LOUD_SPEAKER":
      return <>{type}</>;
      break;

    default:
      break;
  }
};

const NotificationItem = ({ notification }: Props) => {
  return (
    <NotificationItemContainer>
      {getNotificationMarkUp(notification)}
    </NotificationItemContainer>
  );
};

export default NotificationItem;

const NotificationItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 12px;
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadiuses.sm};
  `}
`;
