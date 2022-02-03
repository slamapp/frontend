import React from "react";
import type { MouseEvent, FC, ComponentType } from "react";
import { positionType } from "@enums/positionType";
import { proficiencyType } from "@enums/proficiencyType";
import type { Option } from "./types";
import { sendKakaoLink } from "./sendKakaoLink";

interface Props {
  option: Option;
  component: ComponentType<{ onClick: (e?: MouseEvent<HTMLElement>) => void }>;
}

const ShareMaker = ({ option, component: Component }: Props) => {
  let handleClick = () => {};

  switch (option.type) {
    case "COURT": {
      const { id, name } = option.props;
      handleClick = () =>
        sendKakaoLink({
          title: `${name}`,
          subtitle: `${name}에서 농구 한판 어때요?🏀`,
          path: `/courts?courtId=${id}`,
          alertText: `농구장 공유에 성공했어요🥳`,
          buttonText: `${name} 놀러가기`,
        });
      break;
    }

    case "COURT_CHATROOM": {
      const { id, court } = option.props;
      handleClick = () =>
        sendKakaoLink({
          title: `${court.name}`,
          subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
          path: `/chat/${id}`,
          alertText: `농구장 채팅방 공유에 성공했어요🥳`,
          buttonText: `${court.name} 놀러가기`,
        });
      break;
    }

    case "USER": {
      const { id, nickname, positions, proficiency } = option.props;
      handleClick = () =>
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
      console.error("ShareMaker HOC 패턴으로 option을 선택해 사용해주세요");
    }
  }

  return <Component onClick={handleClick} />;
};

export default ShareMaker;
