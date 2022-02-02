import { useCallback } from "react";
import { IconButton } from "@components/base";
import type { APIChatroom, APICourt, APIUser, OmitAt } from "@domainTypes/tobe";

const defaultSettings = {
  requestUrl: "https://slams.app",
  installTalk: true,
};
interface Props<Type, Payload> {
  type: Type;
  payload: Payload;
}

type ShareButtonProps =
  | Props<"COURT", Pick<APICourt, "id" | "latitude" | "longitude" | "name">>
  | Props<"CHATROOM", OmitAt<APIChatroom>>
  | Props<"USER", OmitAt<APIUser>>;

const ShareButton = (props: ShareButtonProps) => {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") {
      return alert("공유하기 실패");
    }

    const { Kakao } = window;

    let settings;

    switch (props.type) {
      case "COURT": {
        const { id, name } = props.payload;
        settings = {
          ...defaultSettings,
          callback: () => {
            alert(`농구장 공유에 성공했어요🥳`);
          },
          templateArgs: {
            templateId: 69947,
            courtName: `${name}`,
            path: `/courts?courtId=${id}`,
          },
        };
        break;
      }

      case "CHATROOM": {
        const { id } = props.payload;
        settings = {
          ...defaultSettings,
          callback: () => {
            alert(`채팅방 공유에 성공했어요🥳`);
          },
          templateArgs: {
            // TODO: 채팅방 공유 생기면 메시지 템플릿으로 교체하기
            templateId: 69947,
            chatroomName: "채팅방",
            path: `/chat/${id}`,
          },
        };
        break;
      }

      case "USER": {
        const { id } = props.payload;
        settings = {
          ...defaultSettings,
          callback: () => {
            alert(`사용자 공유에 성공했어요🥳`);
          },
          templateArgs: {
            // TODO: 채팅방 공유 생기면 메시지 템플릿으로 교체하기
            templateId: 69947,
            nickname: "사용자",
            path: `/user/${id}`,
          },
        };
        break;
      }

      default:
        break;
    }

    Kakao.Link.sendScrap({ ...settings });
  }, []);

  return <IconButton name="share-2" onClick={handleClick} />;
};

export default ShareButton;
