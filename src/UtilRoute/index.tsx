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
  // TODO: Version2에서 private / prevented RedirectPath Props로 받아오도록 변경하기
  const privateRedirectPath = "/courts";
  const preventedRedirectPath = "/";

  const [localToken] = useLocalToken();
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    if (router.isReady) {
      switch (option) {
        case routeOption.private:
          if (localToken) {
            router.replace({ pathname: `${pathname}`, query: router.query });
          } else {
            router.replace(privateRedirectPath);
          }
          break;
        case routeOption.prevented:
          if (localToken) {
            router.replace(preventedRedirectPath);
          } else {
            router.replace({ pathname: `${pathname}`, query: router.query });
          }
          break;
        default:
          break;
      }
    }
  }, [localToken]);

  return <Fragment>{children}</Fragment>;
};
