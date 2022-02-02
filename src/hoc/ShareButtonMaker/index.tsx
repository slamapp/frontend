import React from "react";
import type { MouseEvent } from "react";
import { positionType } from "@enums/positionType";
import { proficiencyType } from "@enums/proficiencyType";
import type { IconButton } from "@components/base";
import type { GetProps, HOCProps } from "./types";
import { sendKakaoLink } from "./sendKakaoLink";

const ShareButtonMaker = (
  type: HOCProps["type"],
  Component: (props: {
    handleClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  }) => ReturnType<typeof IconButton>
) => {
  switch (type) {
    case "COURT": {
      return ({ id, name }: GetProps<typeof type>) => {
        const handleClick = () =>
          sendKakaoLink({
            title: `${name}`,
            subtitle: `${name}에서 농구 한판 어때요?🏀`,
            path: `/courts?courtId=${id}`,
            alertText: `농구장 공유에 성공했어요🥳`,
            buttonText: `${name} 놀러가기`,
          });

        return <Component handleClick={handleClick} />;
      };
    }

    case "COURT_CHATROOM": {
      return ({ id, court }: GetProps<typeof type>) => {
        const handleClick = () =>
          sendKakaoLink({
            title: `${court.name}`,
            subtitle: `우리 ${court.name} 채팅방으로 놀러오세요🏀`,
            path: `/chat/${id}`,
            alertText: `농구장 채팅방 공유에 성공했어요🥳`,
            buttonText: `${court.name} 놀러가기`,
          });

        return <Component handleClick={handleClick} />;
      };
    }

    case "USER": {
      return ({
        id,
        nickname,
        positions,
        proficiency,
      }: GetProps<typeof type>) => {
        const handleClick = () =>
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

        return <Component handleClick={handleClick} />;
      };
    }

    default: {
      return () => {
        throw new Error(
          "ShareButtonMaker를 HOC 패턴으로 option을 선택해 사용해주세요"
        );
      };
    }
  }
};

export default ShareButtonMaker;
