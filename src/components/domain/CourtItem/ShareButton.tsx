import type { FC } from "react";
import { useCallback } from "react";

import { IconButton } from "@components/base";
import type { APIChatroom, APICourt, APIUser, OmitAt } from "@domainTypes/tobe";
import { useRouter } from "next/router";

interface Props<Type, Payload> {
  type: Type;
  payload: Payload;
}

type ShareButtonProps =
  | Props<
      "SHARE_COURT",
      Pick<APICourt, "id" | "latitude" | "longitude" | "name">
    >
  | Props<"SHARE_CHATROOM", OmitAt<APIChatroom>>
  | Props<"SHARE_USER", OmitAt<APIUser>>;

const ShareButton: FC<ShareButtonProps> = (props) => {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") {
      return alert("공유하기 실패");
    }

    const { Kakao, location } = window;
    const requestUrl = `http://${location.hostname}${
      location.port ? `:${location.port}` : ""
    }/`;
    const settings = {
      requestUrl,
      callback: () => {},
      templateId: 69947,
      templateArgs: { name: "공유하기", url: requestUrl },
      installTalk: true,
    };

    switch (props.type) {
      case "SHARE_COURT": {
        const { id, name } = props.payload;
        settings.requestUrl += `courts?courtId=${id}`;
        settings.callback = () => {
          alert(`코트 정보(${settings.requestUrl}) 공유에 성공했어요🥳`);
        };
        settings.templateArgs = {
          name: `${name}에서 농구 한판 어때요?🏀`,
          url: settings.requestUrl,
        };
        break;
      }

      case "SHARE_CHATROOM": {
        const { id } = props.payload;
        settings.requestUrl += `chat/${id}`;
        settings.callback = () => {
          alert(`채팅방 정보(${settings.requestUrl}) 공유에 성공했어요🥳`);
        };
        break;
      }

      case "SHARE_USER": {
        const { id } = props.payload;
        settings.requestUrl += `user/${id}`;
        settings.callback = () => {
          alert(`유저 정보(${settings.requestUrl}) 공유에 성공했어요🥳`);
        };
        break;
      }

      default:
        break;
    }

    console.log(settings);

    Kakao.Link.sendScrap({ ...settings });
  }, []);

  return <IconButton name="share-2" onClick={handleClick} />;
};

export default ShareButton;
