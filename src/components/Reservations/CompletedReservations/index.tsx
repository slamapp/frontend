import { type } from "os";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Participants from "../Participants";

interface ReserveList {
  reservationId: number;
  courtName: string;
  playTime: string;
}

type ReserveLists = ReserveList[];

const CompletedReservations = () => {
  const DummyReserves = [
    {
      reservationId: 1,
      courtName: "용왕산 근린 공원 농구장",
      playTime: "11월 20일 토요일 11시 - 12시",
    },
    {
      reservationId: 2,
      courtName: "백두산 근린 공원 농구장",
      playTime: "12월 20일 토요일 11시 - 12시",
    },
    {
      reservationId: 3,
      courtName: "북한산 근린 공원 농구장",
      playTime: "1월 20일 토요일 11시 - 12시",
    },
  ];

  return (
    <>
      {DummyReserves.map(({ reservationId, courtName, playTime }) => (
        <BorderDiv key={reservationId}>
          <p>{courtName}</p>
          <p>{playTime}</p>
          <Link href="/">
            <button>예약 보기</button>
          </Link>
          <Participants />
        </BorderDiv>
      ))}
    </>
  );
};

const BorderDiv = styled.div`
  border: 1px solid;
  margin-top: 30px;
`;

export default CompletedReservations;
