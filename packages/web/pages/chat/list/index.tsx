import React from "react"
import type { NextPage } from "next"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const ChatroomListPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_CHATROOM_LIST")

  return (
    <div style={{ marginTop: 24 }}>
      <ChatroomListItem>
        <div>채팅방 아이템</div>
      </ChatroomListItem>
    </div>
  )
}

export default withRouteGuard("private", ChatroomListPage)

const ChatroomListItem = styled.div`
  margin: 8px 16px;
  padding: 16px;

  ${({ theme }) => css`
    border-radius: ${theme.previousTheme.borderRadiuses.lg};
    background: ${theme.previousTheme.colors.white};
  `}
`
