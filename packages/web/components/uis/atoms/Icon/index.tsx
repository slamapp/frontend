import type { ComponentProps } from "react"
import Image from "next/image"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Icons from "feather-icons"

type FeatherIconNameType =
  | "arrow-down-left"
  | "arrow-down-right"
  | "arrow-down"
  | "arrow-left-circle"
  | "arrow-left"
  | "arrow-right-circle"
  | "arrow-right"
  | "arrow-up-circle"
  | "arrow-up-left"
  | "arrow-up-right"
  | "arrow-up"
  | "at-sign"
  | "award"
  | "bar-chart-2"
  | "bar-chart"
  | "battery-charging"
  | "battery"
  | "bell-off"
  | "bell"
  | "bluetooth"
  | "bold"
  | "book-open"
  | "book"
  | "bookmark"
  | "box"
  | "briefcase"
  | "calendar"
  | "camera-off"
  | "camera"
  | "cast"
  | "check-circle"
  | "check-square"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevrons-down"
  | "chevrons-left"
  | "chevrons-right"
  | "chevrons-up"
  | "chrome"
  | "circle"
  | "clipboard"
  | "clock"
  | "cloud-drizzle"
  | "cloud-lightning"
  | "cloud-off"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud"
  | "code"
  | "codepen"
  | "codesandbox"
  | "coffee"
  | "columns"
  | "command"
  | "compass"
  | "copy"
  | "corner-down-left"
  | "corner-down-right"
  | "corner-left-down"
  | "corner-left-up"
  | "corner-right-down"
  | "corner-right-up"
  | "corner-up-left"
  | "corner-up-right"
  | "cpu"
  | "credit-card"
  | "crop"
  | "crosshair"
  | "database"
  | "delete"
  | "disc"
  | "divide-circle"
  | "divide-square"
  | "divide"
  | "dollar-sign"
  | "download-cloud"
  | "download"
  | "dribbble"
  | "droplet"
  | "edit-2"
  | "edit-3"
  | "edit"
  | "external-link"
  | "eye-off"
  | "eye"
  | "facebook"
  | "fast-forward"
  | "feather"
  | "figma"
  | "file-minus"
  | "file-plus"
  | "file-text"
  | "file"
  | "film"
  | "filter"
  | "flag"
  | "folder-minus"
  | "folder-plus"
  | "folder"
  | "framer"
  | "frown"
  | "gift"
  | "git-branch"
  | "git-commit"
  | "git-merge"
  | "git-pull-request"
  | "github"
  | "gitlab"
  | "globe"
  | "grid"
  | "hard-drive"
  | "hash"
  | "headphones"
  | "heart"
  | "help-circle"
  | "hexagon"
  | "home"
  | "image"
  | "inbox"
  | "info"
  | "instagram"
  | "italic"
  | "key"
  | "layers"
  | "layout"
  | "life-buoy"
  | "link-2"
  | "link"
  | "linkedin"
  | "list"
  | "loader"
  | "lock"
  | "log-in"
  | "log-out"
  | "mail"
  | "map-pin"
  | "map"
  | "maximize-2"
  | "maximize"
  | "meh"
  | "menu"
  | "message-circle"
  | "message-square"
  | "mic-off"
  | "mic"
  | "minimize-2"
  | "minimize"
  | "minus-circle"
  | "minus-square"
  | "minus"
  | "monitor"
  | "moon"
  | "more-horizontal"
  | "more-vertical"
  | "mouse-pointer"
  | "move"
  | "music"
  | "navigation-2"
  | "navigation"
  | "octagon"
  | "package"
  | "paperclip"
  | "pause-circle"
  | "pause"
  | "pen-tool"
  | "percent"
  | "phone-call"
  | "phone-forwarded"
  | "phone-incoming"
  | "phone-missed"
  | "phone-off"
  | "phone-outgoing"
  | "phone"
  | "pie-chart"
  | "play-circle"
  | "play"
  | "plus-circle"
  | "plus-square"
  | "plus"
  | "pocket"
  | "power"
  | "printer"
  | "radio"
  | "refresh-ccw"
  | "refresh-cw"
  | "repeat"
  | "rewind"
  | "rotate-ccw"
  | "rotate-cw"
  | "rss"
  | "save"
  | "scissors"
  | "search"
  | "send"
  | "server"
  | "settings"
  | "share-2"
  | "share"
  | "shield-off"
  | "shield"
  | "shopping-bag"
  | "shopping-cart"
  | "shuffle"
  | "sidebar"
  | "skip-back"
  | "skip-forward"
  | "slack"
  | "slash"
  | "sliders"
  | "smartphone"
  | "smile"
  | "speaker"
  | "square"
  | "star"
  | "stop-circle"
  | "sun"
  | "sunrise"
  | "sunset"
  | "tablet"
  | "tag"
  | "target"
  | "terminal"
  | "thermometer"
  | "thumbs-down"
  | "thumbs-up"
  | "toggle-left"
  | "toggle-right"
  | "tool"
  | "trash-2"
  | "trash"
  | "trello"
  | "trending-down"
  | "trending-up"
  | "triangle"
  | "truck"
  | "tv"
  | "twitch"
  | "twitter"
  | "type"
  | "umbrella"
  | "underline"
  | "unlock"
  | "upload-cloud"
  | "upload"
  | "user-check"
  | "user-minus"
  | "user-plus"
  | "user-x"
  | "user"
  | "users"
  | "video-off"
  | "video"
  | "voicemail"
  | "volume-1"
  | "volume-2"
  | "volume-x"
  | "volume"
  | "watch"
  | "wifi-off"
  | "wifi"
  | "wind"
  | "x-circle"
  | "x-octagon"
  | "x-square"
  | "x"
  | "youtube"
  | "zap-off"
  | "zap"
  | "zoom-in"
  | "zoom-out"

interface Props {
  name: FeatherIconNameType
  size?: "sm" | "md" | "lg" | number
  strokeWidth?: number
  rotate?: number
  color?: string
  fill?: boolean
  [prop: string]: any
}

const Icon = ({
  name = "box",
  size = "md",
  strokeWidth = 2,
  rotate = 0,
  color = "#222",
  fill = false,
  ...props
}: Props) => {
  const iconStyle = {
    strokeWidth,
    stroke: color,
    width: size,
    height: size,
    fill: fill ? color : "transparent",
  }
  const icon = Icons.icons[name]
  const svg = icon ? icon.toSvg(iconStyle) : ""
  const base64 = Buffer.from(svg, "utf8").toString("base64")

  return (
    <IconWrapper {...props} size={size} rotate={rotate}>
      <Image
        width={24}
        height={24}
        src={`data:image/svg+xml;base64,${base64}`}
        alt={name}
      />
    </IconWrapper>
  )
}

const IconWrapper = styled.i<Pick<Props, "size" | "rotate">>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size, theme }) => css`
    width: ${typeof size === "string"
      ? theme.previousTheme.iconSize[size]
      : size};
    height: ${typeof size === "string"
      ? theme.previousTheme.iconSize[size]
      : size};
  `}

  img {
    width: 100%;
    height: 100%;
  }
`

Icon.Toggle = ({
  size = "lg",
  iconSize = "sm",
  name = "star",
  checked,
  onChange,
}: {
  name?: ComponentProps<typeof Icon>["name"]
  size?: ComponentProps<typeof StyledIconToggleLabel>["size"]
  iconSize?: ComponentProps<typeof Icon>["size"]
  checked: ComponentProps<"input">["checked"]
  onChange: ComponentProps<"input">["onChange"]
}) => (
  <StyledIconToggleLabel size={size}>
    <Icon color="#FFC700" name={name} fill={checked} size={iconSize} />
    <input type="checkbox" checked={checked} onChange={onChange} />
  </StyledIconToggleLabel>
)

const StyledIconToggleLabel = styled.label<{ size: "sm" | "md" | "lg" }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.previousTheme.colors.white};
  border: 2px solid ${({ theme }) => theme.previousTheme.colors.gray100};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.lg};
  min-width: ${({ theme, size }) => theme.previousTheme.buttonHeights[size]};
  min-height: ${({ theme, size }) => theme.previousTheme.buttonHeights[size]};
  width: ${({ theme, size }) => theme.previousTheme.buttonHeights[size]};
  height: ${({ theme, size }) => theme.previousTheme.buttonHeights[size]};
  cursor: pointer;
  input {
    display: none;
  }
`

export default Icon
