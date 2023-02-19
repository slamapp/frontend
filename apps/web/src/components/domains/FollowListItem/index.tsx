import { HStack, Text } from '@chakra-ui/react'
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
  <HStack width="100%" px="4">
    <ProfileAvatar user={{ id: user.id, profileImage: user.profileImage }} />
    <Text flex={1}>{user.nickname}</Text>
    <div>{isFollowed === undefined ? <></> : isFollowed ? <Button>팔로잉</Button> : <Button>팔로우</Button>}</div>
  </HStack>
)

export default FollowListItem
