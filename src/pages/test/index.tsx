import ModalSheet from "@components/base/ModalSheet";
import { NextPage } from "next";
import { useState } from "react";

const Test: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        클릭
      </button>
      <ModalSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>야호야호</div>
      </ModalSheet>
    </>
  );
};

export default Test;
