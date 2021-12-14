import { NextPage } from "next";
import { type } from "os";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Participants from "../Participants";
import Loudspeaker from "../Loudspeaker";

interface ReserveList {
  reservationId: number;
  courtId: number;
  courtName: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  numberOfReservations: number;
}

type ReserveLists = ReserveList[];

const BorderDiv = styled.div`
  border: 1px solid;
  margin-top: 30px;
`;

const UpcomingReservations: NextPage = () => {
  const DummyReserve = [
    {
      reservationId: 1,
      courtId: 1,
      courtName: "용왕산 근린 공원 농구장",
      numberOfReservations: 10,
      startTime: "2021-12-14T13:35:10",
      endTime: "2021-01-01T14:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 2,
      courtId: 2,
      courtName: "백두산 근린 공원 농구장",
      numberOfReservations: 8,
      startTime: "2021-12-01T01:09:10",
      endTime: "2021-01-01T13:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 3,
      courtId: 3,
      courtName: "북한산 근린 공원 농구장",
      numberOfReservations: 3,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T13:50:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  return (
    <>
      {DummyReserve.map((res) => (
        <BorderDiv key={res.reservationId}>
          <Loudspeaker reserve={res} />
          <p>{res.courtName}</p>
          <p>{res.startTime}</p>
          <p>{res.numberOfReservations} / 6 명</p>
          <Link href="/">
            <button>예약 보기</button>
          </Link>
          <Participants />
        </BorderDiv>
      ))}
    </>
  );
};

export default UpcomingReservations;

// const getTime = (startTime: any) => {
//   const beforeOneHour = new Date(startTime).getTime() - new Date().getTime();
//   return beforeOneHour - 3600000;
// };

// const Reservation = ({ reserve }: any) => {
//   const [loude, setLoude] = useState(false);

//   useEffect(() => {
//     const beforeTime = getTime(reserve.startTime);

//     const timerId = setTimeout(() => {
//       setLoude(true);
//     }, beforeTime);

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, []);

//   return (
//     <BorderDiv key={reserve.reservationId}>
//       <p>{reserve.courtName}</p>
//       <p>{reserve.startTime}</p>
//       <p>{reserve.numberOfReservations} / 6 명</p>
//       {loude && <button>확성기</button>}
//       <Link href="/">
//         <button>예약 보기</button>
//       </Link>
//       <Participants />
//     </BorderDiv>
//   );
// };
