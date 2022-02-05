import { useEffect, useState } from "react";

const useKakao = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  useEffect(() => {
    setIsLoading(!window.Kakao.isInitialized());
  }, []);

  return [isLoading];
};

export default useKakao;
