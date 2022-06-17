import Link from "next/link"
import { Avatar } from "~/components/uis/molecules"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useAuthContext } from "~/contexts/hooks"
import type { APIUser } from "~/domainTypes/tobe/user"

type Size = "lg" | "md" | "sm"

type Props = {
  userId: APIUser["id"]
  nickname: APIUser["nickname"]
  profileImage: APIUser["profileImage"]
  size?: Size
}

const ProfileAvatar = ({
  userId,
  nickname,
  profileImage,
  size = "md",
}: Props) => {
  return (
    <Link href={`/user/${userId}`} passHref>
      <a>
        <Avatar
          size={size}
          src={profileImage || DEFAULT_PROFILE_IMAGE_URL}
          shape="circle"
          alt={`profile ${nickname}`}
        />
      </a>
    </Link>
  )
}

const Mine = () => {
  const { authProps } = useAuthContext()

  if (!authProps.currentUser) {
    return null
  }

  return (
    <ProfileAvatar
      userId={authProps.currentUser.id}
      profileImage={authProps.currentUser.profileImage}
      nickname={authProps.currentUser.nickname}
    />
  )
}

ProfileAvatar.Mine = Mine

export default ProfileAvatar
