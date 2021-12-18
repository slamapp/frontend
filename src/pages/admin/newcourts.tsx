import { useNavigationContext } from "@contexts/hooks";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Spacer, Tab } from "@components/base";
import styled from "@emotion/styled";
import { NewCourtItem, NewCourt } from "@components/domain";

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ADMIN_NEWCOURTS);

  // 더미 데이터
  const readyData: NewCourt[] = [
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
  ];

  const doneData: NewCourt[] = [
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

  return (
    <div>
      <Tab>
        <Tab.Item title="처리 대기" index="ready">
          <Spacer gap="base" type="vertical">
            {readyData.map((court) => (
              <NewCourtItem key={court.newCourtId} data={court} state="READY" />
            ))}
          </Spacer>
        </Tab.Item>
        <Tab.Item title="처리 완료" index="done">
          <Spacer gap="base" type="vertical">
            {doneData.map((court) => (
              <NewCourtItem key={court.newCourtId} data={court} state="DONE" />
            ))}
          </Spacer>
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default NewCourtsPage;
