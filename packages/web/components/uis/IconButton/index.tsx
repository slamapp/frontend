import type { ComponentProps } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Icon } from "~/components/uis"

interface Props {
  name: ComponentProps<typeof Icon>["name"]
  iconSize?: ComponentProps<typeof Icon>["size"]
  iconColor?: ComponentProps<typeof Icon>["color"]
  className?: ComponentProps<typeof StyledIconButton>["className"]
  size?: ComponentProps<typeof StyledIconButton>["size"]
  type?: ComponentProps<typeof StyledIconButton>["type"]
  onClick?: ComponentProps<typeof StyledIconButton>["onClick"]
  noOutlined?: ComponentProps<typeof StyledIconButton>["noOutlined"]
}

const IconButton = ({
  name,
  type = "button",
  iconColor,
  className,
  onClick,
  size = "lg",
  iconSize = "sm",
  noOutlined = false,
}: Props) => {
  return (
    <StyledIconButton
      noOutlined={noOutlined}
      className={className}
      type={type}
      onClick={onClick}
      size={size}
    >
      <Icon name={name} color={iconColor} size={iconSize} />
    </StyledIconButton>
  )
}

const StyledIconButton = styled.button<{
  size: "sm" | "md" | "lg"
  noOutlined: boolean
}>`
  ${({ theme, size, noOutlined }) => css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: white;
    border: ${noOutlined ? 0 : 2}px solid ${theme.colors.gray0100};
    min-width: ${theme.previousTheme.buttonHeights[size]};
    min-height: ${theme.previousTheme.buttonHeights[size]};
    width: ${theme.previousTheme.buttonHeights[size]};
    height: ${theme.previousTheme.buttonHeights[size]};
    cursor: pointer;
  `}
`

IconButton.Share = ({
  onClick,
}: {
  onClick?: ComponentProps<typeof IconButton>["onClick"]
}) => {
  return <IconButton name="share-2" onClick={onClick} />
}

export default IconButton
