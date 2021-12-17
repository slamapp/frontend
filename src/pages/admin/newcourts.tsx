import { useNavigationContext } from "@contexts/hooks";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Spacer } from "@components/base";
import styled from "@emotion/styled";
import { NewCourtItem, NewCourt } from "@components/domain";

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ADMIN_NEWCOURTS);

  // 더미 데이터
  const initialData: NewCourt[] = [
    {
      newCourtId: 1,
      name: "반포한강공원 체력단련장 농구장",
      basketCount: 1,
      longitude: 126.995269636407,
      latitude: 37.5097694752014,
      image: null,
      texture: "RUBBER",
      status: "READY",
      createdAt: "2021-01-01T12:20:10",
    },
    {
      newCourtId: 2,
      name: "잠실한강공원 농구장",
      basketCount: 1,
      longitude: 127.082348760182,
      latitude: 37.5177740347208,
      image: null,
      texture: "RUBBER",
      status: "ACCEPT",
      createdAt: "2021-01-01T12:20:10",
    },
    {
      newCourtId: 3,
      name: "잘못된 농구장",
      basketCount: 1,
      longitude: 127.077064497635,
      latitude: 37.5270939663765,
      image: null,
      texture: "RUBBER",
      status: "DENY",
      createdAt: "2021-01-01T12:20:10",
    },
  ];

  const [data, setData] = useState<NewCourt[]>(initialData);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filterData = (state: "READY" | "DONE") => {
    if (state === "READY") {
      setData(initialData.filter((court) => court.status === "READY"));
    } else {
      setData(initialData.filter((court) => court.status !== "READY"));
    }
  };

  const menuTab = [
    {
      tabTitle: (index: number) => (
        <li
          key={index}
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => {
            filterData("READY");
            tabClickHandler(0);
          }}
        >
          처리 대기
        </li>
      ),
      tabContent: (courtData: NewCourt) => (
        <NewCourtItem
          key={courtData.newCourtId}
          data={courtData}
          state="READY"
        />
      ),
    },
    {
      tabTitle: (index: number) => (
        <li
          key={index}
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => {
            filterData("DONE");
            tabClickHandler(1);
          }}
        >
          처리 완료
        </li>
      ),
      tabContent: (courtData: NewCourt) => (
        <NewCourtItem
          key={courtData.newCourtId}
          data={courtData}
          state="DONE"
        />
      ),
    },
  ];

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    filterData("READY");
  }, []);

  return (
    <div>
      <TabStyle>
        {menuTab.map((section, index) => section.tabTitle(index))}
      </TabStyle>
      <Spacer gap="base" type="vertical">
        {data.map((court) => menuTab[activeIndex].tabContent(court))}
      </Spacer>
    </div>
  );
};

export default NewCourtsPage;

const TabStyle = styled.ul`
  .is-active {
    color: red;
  }
`;
