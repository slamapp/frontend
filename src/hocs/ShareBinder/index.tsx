import { positionType } from "@enums/positionType";
import { proficiencyType } from "@enums/proficiencyType";
import { sendKakaoLink } from "./sendKakaoLink";
import type { ShareProps } from "./types";

const ShareBinder = (props: ShareProps) => {
  let eventHandler = () => {};
  switch (props.type) {
    case "court": {
      const { id, name } = props.court;
      eventHandler = () =>
        sendKakaoLink({
          title: `${name}`,
          subtitle: `${name}에서 농구 한판 어때요?🏀`,
          path: `/courts?courtId=${id}`,
          alertText: `농구장 공유에 성공했어요🥳`,
          buttonText: `${name} 놀러가기`,
        });
      break;
    }

    case "courtChatroom": {
      const { id, court } = props.courtChatroom;
      eventHandler = () =>
        sendKakaoLink({
          title: `${court.name}`,
          subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
          path: `/chat/${id}`,
          alertText: `농구장 채팅방 공유에 성공했어요🥳`,
          buttonText: `${court.name} 놀러가기`,
        });
      break;
    }

    case "user": {
      const { id, nickname, positions, proficiency } = props.user;
      eventHandler = () =>
        sendKakaoLink({
          title: `${nickname}`,
          subtitle: `${nickname}를 소개합니다🏀
  포지션: ${positions.map((position) => positionType[position]).join(", ")}${
            proficiency
              ? `
  실력: ${proficiencyType[proficiency]}`
              : ""
          }`,
          path: `/user/${id}`,
          alertText: `사용자 공유에 성공했어요🥳`,
          buttonText: `${nickname}를 만나러 가기`,
        });
      break;
    }

    default: {
      eventHandler = () => {};
    }
  }

  return props.bind(eventHandler);
};

export default ShareBinder;
