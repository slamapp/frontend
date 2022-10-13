import { useEffect, useState } from "react"
import Router from "next/router"
import { css } from "@emotion/react"
import { AnimatePresence, motion } from "framer-motion"
import { useIntervalFn } from "~/hooks"
import { useScrollContainer } from "~/layouts"

const TopPageLoader = () => {
  const [isProgressBar, setIsProgressBar] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const { scrollContainerWidth } = useScrollContainer()

  const [run, clear] = useIntervalFn(() => {
    if (percentage < 100) {
      setPercentage((prev) => prev + (90 - prev) / 20)
    }
  }, 100)

  useEffect(() => {
    if (isProgressBar) {
      run()
    } else {
      clear()
    }
  }, [isProgressBar])

  useEffect(() => {
    if (!isProgressBar) {
      setPercentage(100)
    }
  }, [isProgressBar])

  useEffect(() => {
    setPercentage(() => 60)
    Router.events.on("routeChangeStart", () => setIsProgressBar(true))
    Router.events.on("routeChangeComplete", () => setIsProgressBar(false))
    Router.events.on("routeChangeError", () => setIsProgressBar(false))
  }, [])

  return (
    <div
      css={css`
        position: fixed;
        width: ${scrollContainerWidth}px;
      `}
    >
      <AnimatePresence mode="wait">
        {isProgressBar && (
          <motion.div
            initial={{ width: `0%` }}
            animate={{ width: `${Math.floor(percentage)}%` }}
            exit={{ width: `100%`, height: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            css={css`
              border-radius: 0 16px 16px 0;
              height: 8px;
              animation-duration: 2s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background-color: #f6f7f8;
              background: linear-gradient(
                to right,
                #f6f4f1 8%,
                #c7c3c0 18%,
                #f6f4f1 33%
              );
              background-size: 800px 104px;
              position: relative;
              @keyframes placeHolderShimmer {
                0% {
                  background-position: -800px 0;
                }
                100% {
                  background-position: 800px 0;
                }
              }
            `}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopPageLoader
