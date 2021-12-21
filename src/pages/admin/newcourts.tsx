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

  // 더미 데이터
  const dummyData: NewCourt[] = [
    {
      newCourtId: 1,
      courtName: "반포한강공원 체력단련장 농구장",
      basketCount: 1,
      longitude: 126.995269636407,
      latitude: 37.5097694752014,
      image: null,
      texture: "RUBBER",
      status: "READY",
      createdAt: "2021-01-01T12:20:10",
    },
  ];

  const [readyData, setReadyData] = useState<NewCourt[]>(dummyData);
  const [doneData, setDoneData] = useState<NewCourt[]>([]);
  const [currentLastId, setCurrentLastId] = useState<number | null>(0);
  const [activeStatus, setActiveStatus] = useState<Status>("READY");

  const getNewCourts = useCallback(async (status: Status) => {
    if (currentLastId === null) return;
    try {
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
  }, []);

  useEffect(() => {
    getNewCourts("READY");
  }, []);

  const handleClick = (status: Status) => {
    setCurrentLastId(0);
    getNewCourts(status);
    setActiveStatus(status);
  };

  const ref = useRef<HTMLDivElement>(null);
  const [isFetching] = useInfiniteScroll(ref, () => {
    getNewCourts(activeStatus);
  });

  return (
    <div>
      <Tab onClick={handleClick}>
        <Tab.Item title="처리 대기" index="READY">
          <Container>
            <Spacer gap="base" type="vertical">
              {isFetching}
              {readyData.map((court) => (
                <NewCourtItem
                  key={court.newCourtId}
                  data={court}
                  state="READY"
                />
              ))}
              처리 대기
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
              처리 완료
            </Spacer>
          </Container>
        </Tab.Item>
      </Tab>
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
