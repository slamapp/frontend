import Link from "next/link";
import { APIUser } from "@domainTypes/tobe/user";
import { Avatar } from "@components/base";
import { DEFAULT_PROFILE_IMAGE_URL } from "@constants/.";
import { FC } from "react";

type Size = "lg" | "md" | "sm";

type Props = {
  userId: APIUser["id"];
  nickname: APIUser["nickname"];
  profileImage: APIUser["profileImage"];
  size?: Size;
};

const Profile: FC<Props> = ({
  userId,
  nickname,
  profileImage,
  size = "md",
}) => (
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
);

export default Profile;
