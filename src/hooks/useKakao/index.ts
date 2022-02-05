import { useEffect } from "react";

const useKakao = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);
};

export default useKakao;
