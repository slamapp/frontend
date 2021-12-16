import { Avatar } from "@components/base";
import Link from "next/link";
import React from "react";

interface Props {
  userId: string | number;
  imageUrl: string;
}

const LinkAvatar = ({ userId, imageUrl }: Props) => {
  return (
    <Link href={`/user/${userId || 1}`} passHref>
      <Avatar size={32} src={imageUrl} />
    </Link>
  );
};

export default LinkAvatar;
