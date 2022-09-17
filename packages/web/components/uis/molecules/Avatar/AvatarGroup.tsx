import React from "react"
import type { ComponentProps, ReactElement, ReactNode } from "react"
import type Avatar from "."

interface Props {
  children: ReactNode
  shape?: ComponentProps<typeof Avatar>["shape"]
  size?: number
}

const AvatarGroup = ({ children, shape = "circle", size = 70 }: Props) => {
  const avatars = React.Children.toArray(children)
    .filter((element) => {
      if (React.isValidElement(element) && element.props.__TYPE === "Avatar") {
        return true
      }

      console.warn("Only accepts Avatar as it's children.")

      return false
    })
    .map((avatar, index, avatars) => {
      const item = avatar as ReactElement

      return React.cloneElement(item, {
        ...item.props,
        size,
        shape,

        style: {
          ...item.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      })
    })

  return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>
}

export default AvatarGroup
