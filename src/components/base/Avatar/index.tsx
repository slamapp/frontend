import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ImageComponent from "../Image";
import AvatarGroup from "./AvatarGroup";
import { AvatarShape } from "./types";

export interface Props {
  lazy?: boolean;
  threshold?: number;
  src: string;
  size?: number;
  shape?: AvatarShape;
  placeholder?: string;
  alt?: string;
  mode?: "cover" | "fill" | "contain";
  __TYPE: "Avatar";
  edit?: boolean;
}

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "round",
  placeholder,
  alt,
  mode = "cover",
  __TYPE = "Avatar",
  edit = false,
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper shape={shape} {...props}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {edit ? <Filter>+</Filter> : null}
    </AvatarWrapper>
  );
};

interface AvatarWrapperProps {
  shape: AvatarShape;
}

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  overflow: hidden;
  > img {
    transition: opacity 0.2s ease;
  }
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  font-size: 50px;
  text-align: center;
  color: white;
`;

Avatar.defaultProps = {
  __TYPE: "Avatar",
};

Avatar.Group = AvatarGroup;

export default Avatar;
