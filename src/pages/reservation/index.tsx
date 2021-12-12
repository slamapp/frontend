import { ModalSheet } from "@components/base";
import { TimeTable } from "@components/domain";
import useTimeTable from "@hooks/useTimeTable";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const Reservation: NextPage = () => {
  const [timeTable, setTimeTable] = useTimeTable();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<any>({
    index: null,
    users: null,
  });

  const handleClickStatusBlock = useCallback(
    (index: number) => {
      const { users } = timeTable[index];
      setIsOpen(true);
      setSelectedBlock({
        index,
        users,
      });
    },
    [timeTable]
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <TimeTable
        timeTable={timeTable}
        onClickStatusBlock={handleClickStatusBlock}
        selectedIndex={selectedBlock.index}
      />
      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {selectedBlock.users &&
          selectedBlock.users.map(({ userId, avatarImgSrc }: any) => (
            <div key={userId}>{userId}</div>
          ))}
        <button type="button">예약하러 가기</button>
      </ModalSheet>
    </div>
  );
};

export default Reservation;
