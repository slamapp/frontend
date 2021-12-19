import { Avatar } from "@components/base";
import Link from "next/link";
import React from "react";

type Size = "large" | "middle" | "small";

const getSize = (size: Size) => {
  switch (size) {
    case "large":
      return 50;
    case "middle":
      return 32;
    case "small":
      return 26;
    default:
      return 32;
  }
};

interface Props {
  userId: string | number;
  imageUrl: string;
  size?: Size;
}

const LinkAvatar = ({ userId, imageUrl, size = "middle" }: Props) => {
  return (
    <Link href={`/user/${userId || 1}`} passHref>
      <Avatar size={getSize(size)} src={imageUrl} shape="circle" />
    </Link>
  );
};

export default LinkAvatar;
