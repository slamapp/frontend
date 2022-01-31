import { Icon } from "@components/base";
import type { FeatherIconNameType } from "@components/base/Icon";
import { useNavigationContext } from "@contexts/hooks";
import type { PageTypeUnion } from "@contexts/NavigationProvider/actionTypes";
import Link from "next/link";

interface Props {
  href: string;
  iconName: FeatherIconNameType;
  pageType: PageTypeUnion;
}

const NavIcon = ({ href, iconName, pageType }: Props) => {
  const { navigationProps } = useNavigationContext();
  const { currentPage } = navigationProps;

  return (
    <Link href={href} key={href} passHref>
      <a>
        <Icon
          name={iconName}
          size={24}
          color={currentPage === pageType ? "black" : "#cfcfcf"}
        />
      </a>
    </Link>
  );
};

export default NavIcon;
