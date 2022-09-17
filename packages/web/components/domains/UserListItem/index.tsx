import React from "react"
import type { CSSProperties } from "react"
import styled from "@emotion/styled"
import { ProfileAvatar } from "~/components/domains"
import { Text, Button, Spacer } from "~/components/uis/atoms"
import { useSocketContext } from "~/contexts/hooks"
import type { APIUser } from "~/types/domains"

interface Props {
  className?: string
  style?: CSSProperties
  isFollowed?: boolean
  user: Pick<APIUser, "id" | "nickname" | "profileImage">
}
// 아바타 + 이름 + 버튼

const UserListItem = ({ className, style, isFollowed, user }: Props) => {
  const { sendFollow, sendFollowCancel } = useSocketContext()

  const { id, nickname, profileImage } = user

  return (
    <ListItem className={className} style={style}>
      <Spacer type="horizontal" gap={10} align="center">
        <ProfileAvatar
          profileImage={profileImage}
          userId={id}
          nickname={nickname}
        />
        <Text size="base" strong>
          {nickname}
        </Text>
      </Spacer>
      <div>
        {isFollowed === undefined ? (
          <></>
        ) : isFollowed ? (
          <Button
            onClick={() => sendFollowCancel({ receiverId: user.id })}
            secondary
          >
            팔로잉
          </Button>
        ) : (
          <Button onClick={() => sendFollow({ receiverId: user.id })}>
            팔로우
          </Button>
        )}
      </div>
    </ListItem>
  )
}

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`

export default UserListItem
