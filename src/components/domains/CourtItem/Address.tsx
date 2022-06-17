import * as S from "./style"

const Address: React.FC = ({ children }) => {
  return (
    <S.SubHeaderArea>
      <S.AddressText>{children}</S.AddressText>
    </S.SubHeaderArea>
  )
}

export default Address
