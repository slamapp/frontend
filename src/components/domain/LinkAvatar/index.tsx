import { Avatar } from "@components/base";
import Link from "next/link";
import React from "react";

type Size = "large" | "middle" | "small";

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

const getSize = (size: Size) => {
  switch (size) {
    case "large":
      return 50;
      break;
    case "middle":
      return 32;
      break;
    case "small":
      return 26;
      break;
    default:
      return 32;
      break;
  }
};
