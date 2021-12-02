import { FC, ReactNode } from "react";
import "./Text.css";

interface Props {
  children: ReactNode;
  block?: boolean;
  paragraph?: boolean;
  size?: number | "small" | "normal" | "large";
  strong?: boolean;
  underline?: boolean;
  delete?: boolean;
  color?: string;
  mark?: boolean;
  code?: boolean;
  [x: string]: any;
}

const Text: FC<Props> = ({
  children,
  block,
  paragraph,
  size,
  strong,
  underline,
  delete: del,
  color,
  mark,
  code,
  ...rest
}) => {
  const Tag = block ? "div" : paragraph ? "p" : "span";

  const fontStyle = {
    fontWeight: strong ? "bold" : undefined,
    fontSize: typeof size === "string" ? undefined : size,
    textDecoration: underline ? "underline" : undefined,
    color,
  };

  if (mark) {
    children = <mark>{children}</mark>;
  }
  if (code) {
    children = <code>{children}</code>;
  }
  if (del) {
    children = <del>{children}</del>;
  }

  return (
    <Tag
      className={typeof size === "string" ? `Text--size-${size}` : undefined}
      style={{ ...rest.style, ...fontStyle }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Text;
