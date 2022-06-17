import type { ComponentProps } from "react"
import styled from "@emotion/styled"
import { Icon } from "~/components/uis/atoms"

interface Props {
  name: ComponentProps<typeof Icon>["name"]
  iconSize?: ComponentProps<typeof Icon>["size"]
  iconColor?: ComponentProps<typeof Icon>["color"]
  className?: ComponentProps<typeof StyledIconButton>["className"]
  size?: ComponentProps<typeof StyledIconButton>["size"]
  type?: ComponentProps<typeof StyledIconButton>["type"]
  onClick?: ComponentProps<typeof StyledIconButton>["onClick"]
}

const IconButton = ({
  name,
  type = "button",
  iconColor,
  className,
  onClick,
  size = "lg",
  iconSize = "sm",
}: Props) => {
  return (
    <StyledIconButton
      className={className}
      type={type}
      onClick={onClick}
      size={size}
    >
      <Icon name={name} color={iconColor} size={iconSize} />
    </StyledIconButton>
  )
}

const StyledIconButton = styled.button<{ size: "sm" | "md" | "lg" }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  min-width: ${({ theme, size }) => theme.buttonHeights[size]};
  min-height: ${({ theme, size }) => theme.buttonHeights[size]};
  width: ${({ theme, size }) => theme.buttonHeights[size]};
  height: ${({ theme, size }) => theme.buttonHeights[size]};
  cursor: pointer;
`

IconButton.Share = ({
  onClick,
}: {
  onClick?: ComponentProps<typeof IconButton>["onClick"]
}) => {
  return <IconButton name="share-2" onClick={onClick} />
}

export default IconButton
