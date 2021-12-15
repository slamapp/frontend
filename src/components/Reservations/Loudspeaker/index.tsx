import React, { useEffect, useState } from "react";

interface Iprops {
  reserve: any;
}

const Loudspeaker = ({ reserve }: Iprops) => {
  const [timer, setTimer] = useState(false);
  const [disable, setDisable] = useState(false);

  const getTime = (startTime: any) => {
    const beforeOneHour = new Date(startTime).getTime() - new Date().getTime();
    if (new Date(startTime).getTime() < new Date().getTime()) {
      setDisable(true);
    }

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
    <div>
      {timer && (
        <button disabled={disable} onClick={() => setDisable(true)}>
          확성기
        </button>
      )}
    </div>
  );
};
export default Loudspeaker;
