import React, { useEffect, useState } from "react";

interface Iprops {
  reserve: any;
}

const Loudspeaker = ({ reserve }: Iprops) => {
  const [timer, setTimer] = useState(false);

  const getTime = (startTime: any) => {
    const beforeOneHour = new Date(startTime).getTime() - new Date().getTime();
    return beforeOneHour - 3600000;
  };

  useEffect(() => {
    const checkTime = getTime(reserve.startTime);

    const timerId = setTimeout(() => {
      setTimer(true);
    }, checkTime);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div key={reserve.reservationId}>{timer && <button>확성기</button>}</div>
  );
};
export default Loudspeaker;
