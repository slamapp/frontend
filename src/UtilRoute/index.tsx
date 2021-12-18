import { useLocalToken } from "@hooks/domain";
import { useRouter } from "next/router";
import { ComponentType, Fragment, ReactNode, useEffect, useState } from "react";

const routeOption = {
  private: "private",
  prevented: "prevented",
} as const;

type RouteOption = typeof routeOption;
type RouteOptionUnion = RouteOption[keyof RouteOption];

const UtilRoute = <P extends object>(
  option: RouteOptionUnion,
  Component: ComponentType<P>
) => {
  return ({ ...props }: any) => (
    <UtilRouteHOCWrapper option={option}>
      <Component {...props} />
    </UtilRouteHOCWrapper>
  );
};

export default UtilRoute;

const UtilRouteHOCWrapper = ({
  option,
  children,
}: {
  option: RouteOptionUnion;
  children: ReactNode;
}) => {
  const [isShowChildren, setIsShowChildren] = useState(false);
  const [localToken] = useLocalToken();
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    if (router.isReady) {
      switch (option) {
        case routeOption.private:
          if (localToken) {
            setIsShowChildren(true);
            router.replace({ pathname: `${pathname}`, query: router.query });
          } else {
            router.replace("/login");
          }
          break;
        case routeOption.prevented:
          if (localToken) {
            router.replace("/");
          } else {
            setIsShowChildren(true);
            router.replace({ pathname: `${pathname}`, query: router.query });
          }
          break;
        default:
          break;
      }
    }
  }, [localToken, option, router]);

  return <Fragment>{isShowChildren && children}</Fragment>;
};
