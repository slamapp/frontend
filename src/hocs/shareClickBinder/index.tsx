import type { ComponentType, UIEvent } from "react";
import { positionType } from "@enums/positionType";
import { proficiencyType } from "@enums/proficiencyType";
import useKakao from "@hooks/useKakao";
import { sendKakaoLink } from "./sendKakaoLink";
import type { ShareArgs } from "./types";

const shareClickBinder = (...args: ShareArgs) => {
  return (
    WrappedComponent: ComponentType<{ onClick?: (e?: UIEvent) => void }>
  ) => {
    const [isKakaoLoading] = useKakao();

    let eventHandler = () => {};
    switch (args[0]) {
      case "court": {
        const { id, name } = args[1].court;
        eventHandler = () =>
          sendKakaoLink({
            title: `${name}`,
            subtitle: `${name}에서 농구 한판 어때요?🏀`,
            path: `/courts?courtId=${id}`,
            callbackText: `농구장 공유에 성공했어요🥳`,
            buttonText: `${name} 놀러가기`,
          });
        break;
      }

      case "courtChatroom": {
        const { id, court } = args[1].courtChatroom;
        eventHandler = () =>
          sendKakaoLink({
            title: `${court.name}`,
            subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
            path: `/chat/${id}`,
            callbackText: `농구장 채팅방 공유에 성공했어요🥳`,
            buttonText: `${court.name} 놀러가기`,
          });
        break;
      }

      case "user": {
        const { id, nickname, positions, proficiency } = args[1].user;
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
            callbackText: `사용자 공유에 성공했어요🥳`,
            buttonText: `${nickname}를 만나러 가기`,
          });
        break;
      }

      default: {
        throw new Error(
          "지정된 type이 아니면 shareClickBinder는 eventHandler를 바인딩 할 수 없습니다."
        );
      }
    }

    if (isKakaoLoading) {
      return <></>;
    } else {
      return <WrappedComponent onClick={eventHandler} />;
    }
  };
};

export default shareClickBinder;
