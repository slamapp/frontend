import type { NextPage } from "next";
import React from "react";
import { useNavigationContext } from "@contexts/hooks";
import UtilRoute from "UtilRoute";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ChatroomListPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.CHATROOM_LIST);

  return (
    <div>
      <ChatroomListItem>
        <div>hi</div>
      </ChatroomListItem>
    </div>
  );
});

export default ChatroomListPage;

const ChatroomListItem = styled.div`
  margin: 8px 16px;
  padding: 16px;

  ${({ theme }) => css`
    border-radius: ${theme.borderRadiuses.lg};
    background: ${theme.colors.white};
  `}
`;
