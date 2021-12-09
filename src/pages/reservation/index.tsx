import { ModalSheet } from "@components/base";
import { TimeTable } from "@components/domain";
import useTimeTable from "@hooks/useTimeTable";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const Reservation: NextPage = () => {
  const [timeTable, setTimeTable] = useTimeTable();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBlockUsers, setSelectedBlockUsers] = useState<any>(null);

  const onClickTimeBlock = useCallback((index: number) => {
    setIsOpen(true);
    setSelectedBlockUsers(timeTable[index].users);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <TimeTable timeTableArr={timeTable} onClickTimeBlock={onClickTimeBlock} />
      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {selectedBlockUsers &&
          selectedBlockUsers.map(({ userId, avatarImgSrc }: any) => (
            <div key={userId}>{userId}</div>
          ))}
      </ModalSheet>
    </div>
  );
};

export default Reservation;
