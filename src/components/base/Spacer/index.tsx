import {
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";

interface Props {
  type?: "horizontal" | "vertical";
  size?: number;
  children: ReactNode;
  [x: string]: any;
}

const Spacer = ({
  children,
  type = "horizontal",
  size = 8,
  ...props
}: Props) => {
  const style = {
    ...props.style,
    display: type === "vertical" ? "block" : "inline-block",
    verticalAlign: type === "horizontal" ? "middle" : undefined,
  };

  const nodes = Children.toArray(children)
    .filter((element) => isValidElement(element))
    .map((element, index, elements) => {
      const item = element as ReactElement;
      return cloneElement(item, {
        ...item.props,
        style: {
          ...item.props.style,
          marginRight:
            type === "horizontal" && index !== elements.length - 1
              ? size
              : undefined,
          marginBottom:
            type === "vertical" && index !== elements.length - 1
              ? size
              : undefined,
        },
      });
    });

  return (
    <div {...props} style={style}>
      {nodes}
    </div>
  );
};

export default Spacer;
