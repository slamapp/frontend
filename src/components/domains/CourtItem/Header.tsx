import { Spacer, Icon, Text } from "~/components/uis/atoms";

const Header: React.FC = ({ children }) => {
  return (
    <Spacer gap="xxs">
      <Icon name="map-pin" color="#FE6D04" />
      <Text size="lg" strong>
        {children}
      </Text>
    </Spacer>
  );
};

export default Header;
