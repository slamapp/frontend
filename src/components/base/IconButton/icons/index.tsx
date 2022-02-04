import { IconButton } from "@components/base";
import type { MouseEvent } from "react";

interface Props {
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const Share = ({ onClick }: Props) => {
  return <IconButton name="share-2" onClick={onClick} />;
};
