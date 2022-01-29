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
  userId?: string | number;
  imageUrl: string;
  size?: Size | number;
  alt?: string;
}

const LinkAvatar = ({
  userId,
  imageUrl,
  size = "middle",
  alt = "link_avatar",
}: Props) => {
  return (
    <Link href={`/user/${userId}`} passHref>
      <a>
        <Avatar
          size={typeof size === "number" ? size : getSize(size)}
          src={imageUrl}
          shape="circle"
          alt={alt}
        />
      </a>
    </Link>
  );
};

export default LinkAvatar;
