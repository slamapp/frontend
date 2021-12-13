import { ReactNode } from "react";
import { Context } from "./context";
import useStomp from "./useStomp";

interface Props {
  children: ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [compatClient, isSocketReady] = useStomp();
  console.log(isSocketReady);

  return (
    <Context.Provider
      value={{
        compatClient,
      }}
    >
      {isSocketReady ? children : <div>소켓 준비중입니다</div>}
    </Context.Provider>
  );
};

export default SocketProvider;

export { default as useSocketContext } from "./hook";
