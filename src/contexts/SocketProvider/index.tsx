import styled from "@emotion/styled";
import { useLocalToken } from "@hooks/domain";
import { ReactNode } from "react";
import { Context } from "./context";
import useStomp from "./useStomp";

interface Props {
  children: ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [compatClient, isConnected, isLoading] = useStomp();
  const [token, _] = useLocalToken();

  const sendAuth = (destination: string, body: { [x: string]: any }) => {
    const bodyStringified = JSON.stringify(body);
    if (compatClient && token)
      compatClient.send(destination, { token }, bodyStringified);
  };

  const sendTestOn = (body: { [x: string]: any }) => {
    sendAuth("/teston", body);
  };

  const sendChat = (body: { [x: string]: any }) => {
    sendAuth("/chat", body);
  };

  const sendObject = (body: { [x: string]: any }) => {
    sendAuth(`/object`, body);
  };

  return (
    <Context.Provider
      value={{
        sendTestOn,
        sendChat,
        sendObject,
      }}
    >
      {isLoading ? (
        <StyledTopSocketLoading isLoading={true} />
      ) : isConnected ? (
        <></>
      ) : (
        <StyledTopSocketLoading isLoading={false} />
      )}

      {children}
    </Context.Provider>
  );
};

export default SocketProvider;

export { default as useSocketContext } from "./hook";

const StyledTopSocketLoading = styled.div<{ isLoading: boolean }>`
  position: absolute;
  height: 4px;
  width: 100%;
  background: linear-gradient(
    90deg,
    ${({ isLoading }) =>
      isLoading
        ? `#EDEBE7, #EDEBE7, #FAF9F7, #EDEBE7,#EDEBE7, #FAF9F7, #EDEBE7, #EDEBE7`
        : "#EDEBE7, #EDEBE7"}
  );
  background-size: 200% 100%;
  animation: ${({ isLoading }) =>
    isLoading ? "gradient-animation 2s linear infinite" : "none"};
  z-index: 9999;

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;
