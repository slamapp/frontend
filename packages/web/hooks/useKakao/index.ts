import { useEffect, useState } from "react"
import { env } from "~/constants"

const useKakao = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(env.KAKAO_JAVASCRIPT_KEY)
    }
  }, [])

  useEffect(() => {
    setIsInitialized(window.Kakao.isInitialized())
  }, [])

  return [isInitialized]
}

export default useKakao
