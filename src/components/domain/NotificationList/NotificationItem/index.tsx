import React from "react";
import { Notification } from "@contexts/AuthProvider/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { LinkStrong, Spacer } from "@components/base";
import { CourtItem, LinkAvatar } from "@components/domain";
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
    <NotificationItemContainer type={notification.type}>
      <Spacer gap={6} style={{ alignItems: "center" }}>
        {getNotificationMarkUp({ date, notification })}
      </Spacer>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            height: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
            }}
          >
            {isRead ? "읽음" : "안 읽음"}
            {isClicked ? "확인 함" : "확인 안함"}
          </div>
          <div style={{ fontSize: 12 }}>{fromCreatedAt}</div>
        </div>
      </div>
    </NotificationItemContainer>
  );
};
export default NotificationItem;

const getNotificationMarkUp = ({
  date,
  notification: { type, loudspeakerInfo, followerInfo },
}: {
  date: Date;
  notification: Notification;
}) => {
  const dayFormatted = dayjs(date).format("YYYY-MM-DD");

  switch (type) {
    case "FOLLOWING":
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
            님이 팔로우 했습니다
          </div>
        </>
      );
      break;

    case "LOUDSPEAKER":
      return (
        <>
          {loudspeakerInfo && (
            <>
              <CourtItem.KakaoMapLink
                latitude={loudspeakerInfo.courtInfo.latitude}
                longitude={loudspeakerInfo.courtInfo.longitude}
                courtName={loudspeakerInfo.courtInfo.name}
                type="findRoad"
              />

              <div>
                <div>
                  <LinkStrong
                    href={`courts/${loudspeakerInfo.courtInfo.id}/${dayFormatted}`}
                  >
                    {`${loudspeakerInfo.courtInfo.name} (농구 골대 ${loudspeakerInfo.courtInfo.basketCount} 개)`}
                  </LinkStrong>
                  에서 함께 농구할 사람을 급하게 구하고 있습니다
                </div>

                <div>{loudspeakerInfo.courtInfo.image}</div>
              </div>
            </>
          )}{" "}
        </>
      );
      break;

    default:
      break;
  }
};

const NotificationItemContainer = styled.div<{
  type: "LOUDSPEAKER" | "FOLLOWING";
}>`
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  ${({ theme, type }) => css`
    background: ${type === "FOLLOWING"
      ? theme.colors.white
      : theme.colors.activeGradientColor};
    color: ${type === "FOLLOWING" ? theme.colors.gray900 : theme.colors.white};
    border-radius: ${theme.borderRadiuses.sm};
    box-shadow: ${theme.boxShadows.sm};
  `}
`;
