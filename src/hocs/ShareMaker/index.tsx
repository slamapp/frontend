import React from "react";

import { positionType } from "@enums/positionType";
import { proficiencyType } from "@enums/proficiencyType";

import { sendKakaoLink } from "./sendKakaoLink";
import type { Props } from "./types";

const ShareMaker = (props: Props) => {
  let handleClick = () => {};

  if ("court" in props) {
    const { id, name } = props.court;
    handleClick = () =>
      sendKakaoLink({
        title: `${name}`,
        subtitle: `${name}에서 농구 한판 어때요?🏀`,
        path: `/courts?courtId=${id}`,
        alertText: `농구장 공유에 성공했어요🥳`,
        buttonText: `${name} 놀러가기`,
      });
  }

  if ("courtChatroom" in props) {
    const { id, court } = props.courtChatroom;
    handleClick = () =>
      sendKakaoLink({
        title: `${court.name}`,
        subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
        path: `/chat/${id}`,
        alertText: `농구장 채팅방 공유에 성공했어요🥳`,
        buttonText: `${court.name} 놀러가기`,
      });
  }

  if ("user" in props) {
    const { id, nickname, positions, proficiency } = props.user;
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
  } else {
    console.error("ShareMaker HOC 패턴으로 option을 선택해 사용해주세요");
  }

  return props.bind(handleClick);
};

export default ShareMaker;
