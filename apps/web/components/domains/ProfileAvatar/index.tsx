import Link from "next/link"
import { Avatar } from "@chakra-ui/react"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import type { APIUser } from "~/types/domains/objects"

const ProfileAvatar = ({
  user,
}: {
  user: Pick<APIUser, "id" | "profileImage">
}) => {
  return (
    <Link
      href={`/user/${user.id}`}
      passHref
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        w="36px"
        h="36px"
        src={user.profileImage || DEFAULT_PROFILE_IMAGE_URL}
      />
    </Link>
  )
}

export default ProfileAvatar
