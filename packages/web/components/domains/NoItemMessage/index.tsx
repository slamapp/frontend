import React from "react"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "@emotion/styled"
import { Spacer, Icon, Text, Button } from "~/components/uis/atoms"

interface Props {
  title: string
  description: string
  buttonTitle: string
  style?: CSSProperties
  type: "reservation" | "favorite" | "notification"
}

const NoItemMessage = ({
  title,
  description,
  buttonTitle,
  style,
  type,
}: Props) => {
  return (
    <Spacer
      align="center"
      justify="center"
      gap="base"
      style={{ ...style, height: "80%" }}
    >
      <Image
        width={90}
        height={170}
        unoptimized
        src={
          type === "favorite"
            ? "/assets/basketball/fire_off_favorited.gif"
            : type === "reservation"
            ? "/assets/basketball/fire_off_reservated.gif"
            : "/assets/basketball/animation_off_400.png"
        }
        alt="basketball"
      />
      <Spacer gap="xxs" style={{ textAlign: "center" }}>
        <Text size="md" block strong>
          {title}
        </Text>
        <TextGray size="xs">{description}</TextGray>
      </Spacer>
      <Link href="/map" passHref>
        <a>
          <SearchButton fullWidth>
            <SearchIcon name="map" size="sm" color="white" />
            {buttonTitle}
          </SearchButton>
        </a>
      </Link>
      <div style={{ height: 40 }}></div>
    </Spacer>
  )
}

export default NoItemMessage

const TextGray = styled(Text)`
  color: ${({ theme }) => theme.previousTheme.colors.gray700};
`

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`
