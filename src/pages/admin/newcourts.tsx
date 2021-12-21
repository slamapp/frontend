import { useNavigationContext } from "@contexts/hooks";
import { NextPage } from "next";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Spacer, Tab } from "@components/base";
import styled from "@emotion/styled";
import { NewCourtItem, NewCourt } from "@components/domain";
import managementApi from "@service/managementApi";
import { useInfiniteScroll } from "@hooks/.";

type Status = "READY" | "DONE";

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ADMIN_NEWCOURTS);

  const [readyData, setReadyData] = useState<NewCourt[]>([]);
  const [doneData, setDoneData] = useState<NewCourt[]>([]);
  const [currentLastId, setCurrentLastId] = useState<number | null>(0);
  const [activeStatus, setActiveStatus] = useState<Status>("READY");
  const [isFetching, setIsFetching] = useState(false);

  const loadMore = useCallback(
    async (status: Status) => {
      if (readyData.length === 0 || isFetching || currentLastId === null) {
        return;
      }

      try {
        setIsFetching(true);
        const { contents, lastId } = await managementApi.getNewCourts(
          status,
          !currentLastId,
          currentLastId
        );
        if (status === "READY") {
          setReadyData((prev) => [...prev, ...contents]);
        } else {
          setDoneData((prev) => [...prev, ...contents]);
        }
        setCurrentLastId(lastId);
      } catch (error) {
        console.error(error);
      }

      setIsFetching(false);
    },
    [currentLastId, isFetching, readyData.length]
  );

  const getNewCourts = useCallback(
    async (status: Status) => {
      try {
        setIsFetching(true);
        const { contents, lastId } = await managementApi.getNewCourts(
          status,
          !currentLastId,
          currentLastId
        );
        if (status === "READY") {
          setReadyData((prev) => [...prev, ...contents]);
        } else {
          setDoneData((prev) => [...prev, ...contents]);
        }
        setCurrentLastId(lastId);
      } catch (error) {
        console.error(error);
      }

      setIsFetching(false);
    },
    [currentLastId, isFetching, readyData.length]
  );

  const handleClick = async (status: Status) => {
    setCurrentLastId(0);
    setReadyData([]);
    setDoneData([]);
    await getNewCourts(status);
    setActiveStatus(status);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNewCourts("READY");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadMore(activeStatus);
          }
        });
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref, activeStatus, getNewCourts]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Tab onClick={handleClick}>
        <Tab.Item title="처리 대기" index="READY">
          <Container>
            <Spacer gap="base" type="vertical">
              {readyData.map((court) => (
                <NewCourtItem
                  key={court.newCourtId}
                  data={court}
                  state="READY"
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
        <Tab.Item title="처리 완료" index="DONE">
          <Container>
            <Spacer gap="base" type="vertical">
              {doneData.map((court) => (
                <NewCourtItem
                  key={court.newCourtId}
                  data={court}
                  state="DONE"
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
      </Tab>
      {readyData.length === 0 && <div style={{ flex: 1 }}></div>}
      <div ref={ref} style={{ height: 10 }}></div>
    </div>
  );
};

export default NewCourtsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: ${({ theme }) => theme.gaps.base};
`;
