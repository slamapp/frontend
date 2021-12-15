import { type } from "os";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import ShareButton from "@components/ShareButton";
import Participants from "../Participants";
import Loudspeaker from "../Loudspeaker";

interface ReserveList {
  reservationId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  numberOfReservations: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

type ReserveLists = ReserveList[];

const BorderDiv = styled.div`
  border: 1px solid;
  margin-top: 30px;
`;

const UpcomingReservations = () => {
  const DummyReserve = [
    {
      reservationId: 3,
      courtId: 1,
      courtName: "영통구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 2,
      numberOfReservations: 6,
      startTime: "2021-12-16T05:10:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 5,
      courtId: 7,
      courtName: "관악구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  return (
    <>
      {DummyReserve.map(
        ({
          reservationId,
          startTime,
          endTime,
          courtName,
          numberOfReservations,
          latitude,
          longitude,
        }) => (
          <BorderDiv key={reservationId}>
            <Loudspeaker reserve={{ startTime }} />
            <p>{courtName}</p>
            <p>
              {startTime.substr(0, 4)}년{startTime.substr(5, 2)}월
              {startTime.substr(8, 2)}일
            </p>
            <p>
              {startTime.substr(11, 5)} - {endTime.substr(11, 5)}
            </p>
            <p>{numberOfReservations} / 6 명</p>
            <Link href="/">
              <button>예약 보기</button>
            </Link>
            <Participants />
            <a
              href={`https://map.kakao.com/?urlX=${latitude}&urlY=${longitude}&name=${courtName}`}
              target="_blank"
              rel="noreferrer"
            >
              <button>카카오맵</button>
            </a>
            <button>즐겨찾기</button>
            <ShareButton />
            <Link href="/chat">
              <button>채팅</button>
            </Link>
          </BorderDiv>
        )
      )}
    </>
  );
};

export default UpcomingReservations;
