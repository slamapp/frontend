import { NextPage } from "next";
import React, { useCallback, useRef } from "react";
import UtilRoute from "UtilRoute";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import styled from "@emotion/styled";
import NotificationList from "@components/domain/NotificationList";
import { useInfiniteScroll } from "@hooks/.";
import { Skeleton, Spinner } from "@components/base";

const NotificationsPage: NextPage = UtilRoute("private", () => {
  const { getMoreNotifications } = useAuthContext();

  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.NOTIFICATIONS);

  const ref = useRef<HTMLDivElement>(null);
  const [isFetching] = useInfiniteScroll(ref, getMoreNotifications, 1);

  console.log(isFetching);

  return (
    <PageConainer>
      <NotificationList />

      <div ref={ref} style={{ height: 100 }}>
        {isFetching && (
          <>
            <SkeletonNotification />
            <SkeletonNotification />
          </>
        )}
      </div>
    </PageConainer>
  );
});

export default NotificationsPage;

const PageConainer = styled.div`
  flex: 1;
`;

const SkeletonNotification = () => (
  <div style={{ padding: 12 }}>
    <div style={{ display: "flex" }}>
      <div style={{ float: "left", marginRight: 16 }}>
        <Skeleton.Circle size={60} />
      </div>
      <div style={{ float: "left", width: "80%" }}>
        <Skeleton.Paragraph line={2} />
      </div>
      <div style={{ clear: "both" }} />
    </div>
  </div>
);
