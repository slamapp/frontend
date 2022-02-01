import type { FC } from "react";
import { useCallback } from "react";

import { IconButton } from "@components/base";
import type { APIChatroom, APICourt, APIUser, OmitAt } from "@domainTypes/tobe";

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

    const { Kakao } = window;
    const settings = {
      requestUrl: "https://slams.app",
      callback: () => {},
      templateId: 69947,
      templateArgs: { path: "", courtName: "" },
      installTalk: true,
    };

    switch (props.type) {
      case "SHARE_COURT": {
        const { id, name } = props.payload;
        settings.callback = () => {
          alert(`농구장 공유에 성공했어요🥳`);
        };
        settings.templateArgs = {
          courtName: `${name}`,
          path: `/courts?courtId=${id}`,
        };
        break;
      }

      case "SHARE_CHATROOM": {
        const { id } = props.payload;
        settings.callback = () => {
          alert(`채팅방 공유에 성공했어요🥳`);
        };
        settings.templateArgs = {
          courtName: "채팅방",
          path: `/chat/${id}`,
        };
        break;
      }

      case "SHARE_USER": {
        const { id } = props.payload;
        settings.callback = () => {
          alert(`사용자 공유에 성공했어요🥳`);
        };
        settings.templateArgs = {
          courtName: "사용자",
          path: `user/${id}`,
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
