import React from "react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

interface Props {
  children: React.ReactNode
}

const Address = ({ children }: Props) => {
  return (
    <S.SubHeaderArea>
      <S.AddressText>{children}</S.AddressText>
    </S.SubHeaderArea>
  )
}

export default Address

const S = {
  SubHeaderArea: styled.div`
    height: 50px;
  `,
  AddressText: styled(Text)`
    color: ${({ theme }) => theme.previousTheme.colors.gray700};
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `,
}
