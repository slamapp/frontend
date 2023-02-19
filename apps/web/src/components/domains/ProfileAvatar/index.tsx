import Link from 'next/link'
import { Avatar } from '@chakra-ui/react'
import { APIUser } from '@slam/types'
import { DEFAULT_PROFILE_IMAGE_URL } from '~/constants'

const ProfileAvatar = ({ user }: { user: Pick<APIUser, 'id' | 'profileImage'> }) => {
  return (
    <Link
      href={`/user/${user.id}`}
      passHref
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar w="36px" h="36px" src={user.profileImage || DEFAULT_PROFILE_IMAGE_URL} />
    </Link>
  )
}

export default ProfileAvatar
