import type { CSSProperties } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { Button, Icon, Image, Spacer, Text } from "~/components/uis"

interface Props {
  title: string
  description: string
  buttonTitle?: string
  style?: CSSProperties
}

const ErrorMessage = ({ title, description, buttonTitle, style }: Props) => {
  return (
    <Spacer
      align="center"
      justify="center"
      gap="base"
      style={{ ...style, height: "80%" }}
    >
      <Image src="/assets/error.svg" alt="error" />
      <Spacer gap="xxs" style={{ textAlign: "center" }}>
        <Text size="md" block strong>
          {title}
        </Text>
        <TextGray size="xs">{description}</TextGray>
      </Spacer>
      <Link href="/map" passHref>
        <SearchButton fullWidth>
          <SearchIcon name="map" size="sm" color="white" />
          {buttonTitle}
        </SearchButton>
      </Link>
      <div style={{ height: 40 }}></div>
    </Spacer>
  )
}

export default ErrorMessage

const TextGray = styled(Text)`
  color: ${({ theme }) => theme.previousTheme.colors.gray500};
`

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`
