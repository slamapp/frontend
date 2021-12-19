import styled from "@emotion/styled";
import Link from "next/link";
import { MouseEvent } from "react";
import type { NewCourt } from "./types";

interface Props {
  data: NewCourt;
  state: "READY" | "DONE";
  [x: string]: any;
}

const NewCourtItem = ({ data, state, style }: Props) => {
  const handleDeny = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: API 보내기
  };

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: API 보내기
  };

  return (
    <Link href={`/admin/newcourts/${data.newCourtId}`} passHref>
      <Container style={style}>
        <p>{data.name}</p>
        {state === "READY" ? (
          <div>
            <button onClick={handleDeny}>거절</button>
            <button onClick={handleAccept}>승인</button>
          </div>
        ) : data.status === "ACCEPT" ? (
          <StatusBar className="accept">승인</StatusBar>
        ) : (
          <StatusBar className="deny">거절</StatusBar>
        )}
      </Container>
    </Link>
  );
};

export default NewCourtItem;

const Container = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
`;

const StatusBar = styled.span`
  height: 100%;

  &.accept {
    background: lightgreen;
  }

  &.deny {
    background: orange;
  }
`;
