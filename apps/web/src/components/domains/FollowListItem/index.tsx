import { Box, Stack } from '@jsxcss/emotion'
import type { APIUser } from '@slam/types'
import { Button } from '~/components/uis'
import ProfileAvatar from '../ProfileAvatar'

const FollowListItem = ({
  user,
  isFollowed,
}: {
  isFollowed: boolean
  user: Pick<APIUser, 'profileImage' | 'nickname' | 'id'>
}) => (
  <Stack.Horizontal align="center" spacing={8} width="100%" padding="0 4px">
    <ProfileAvatar user={{ id: user.id, profileImage: user.profileImage }} />
    <Box flex={1}>{user.nickname}</Box>
    <div>{isFollowed === undefined ? <></> : isFollowed ? <Button>팔로잉</Button> : <Button>팔로우</Button>}</div>
  </Stack.Horizontal>
)

export default FollowListItem
