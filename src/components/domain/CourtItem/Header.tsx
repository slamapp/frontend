import { Icon, Spacer, Text } from "@components/base";
import styled from "@emotion/styled";

interface Props {
  courtName: string;
  address: string;
}

const Header: React.FC<Props> = ({ courtName, address }) => {
  return (
    <Spacer type="vertical" gap="xs">
      <Spacer gap="xxs">
        <Icon name="map-pin" color="#FE6D04" />
        <Text size="lg" strong>
          {courtName}
        </Text>
      </Spacer>
      <AddressArea>
        <Address>{address}</Address>
      </AddressArea>
    </Spacer>
  );
};

export default Header;

const AddressArea = styled.div`
  height: 50px;
`;
const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.gray500};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
