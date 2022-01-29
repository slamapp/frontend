import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { LinkStrong, Spacer } from "@components/base";
import { CourtItem, LinkAvatar } from "@components/domain";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { APINotification } from "@domainTypes/tobe/notification";
import { DEFAULT_PROFILE_IMAGE_URL } from "@constants/.";

dayjs.extend(relativeTime);

interface Props {
  notification: APINotification;
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
  notification: { type, loudspeaker, follow },
}: {
  date: Date;
  notification: APINotification;
}) => {
  const dayFormatted = dayjs(date).format("YYYY-MM-DD");

  switch (type) {
    case "FOLLOWING":
      return (
        <>
          <LinkAvatar
            userId={follow!.sender.id}
            imageUrl={follow!.sender.profileImage || DEFAULT_PROFILE_IMAGE_URL}
          />
          <div>
            <LinkStrong href={`user/${follow!.sender.id}`}>
              {follow!.sender.nickname}
            </LinkStrong>
            님이 팔로우 했습니다
          </div>
        </>
      );
      break;

    case "LOUDSPEAKER":
      return (
        loudspeaker && (
          <>
            <CourtItem.KakaoMapLink
              latitude={loudspeaker.court.latitude}
              longitude={loudspeaker.court.longitude}
              courtName={loudspeaker.court.name}
              type="findRoad"
            />

            <div>
              <div>
                <LinkStrong
                  href={`courts/${loudspeaker.court.id}/${dayFormatted}`}
                >
                  {`${loudspeaker.court.name} (농구 골대 ${loudspeaker.court.basketCount} 개)`}
                </LinkStrong>
                에서 함께 농구할 사람을 급하게 구하고 있습니다
              </div>

              <div>{loudspeaker.court.image}</div>
            </div>
          </>
        )
      );
      break;

    default:
      break;
  }
};

const NotificationItemContainer = styled.div<{ type: APINotification["type"] }>`
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
