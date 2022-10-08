import type { ComponentProps, ReactNode } from "react"
import { css } from "@emotion/react"
import { motion } from "framer-motion"
import { IconButton } from "~/components/uis"
import { useMap } from "../../context"

const ZoomInOut = () => {
  const { map } = useMap()

  const handleClickZoomIn = () => {
    if (map?.getLevel() || 0 > 1) {
      map?.setLevel(map?.getLevel() - 1, { animate: true })
    }
  }
  const handleClickZoomOut = () => {
    if (map?.getLevel() || 0 < 7) {
      map?.setLevel(map?.getLevel() + 1, { animate: true })
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      css={css`
        position: absolute;
        top: 100px;
        left: 15px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <TapAnimate onTapStart={handleClickZoomIn}>
        <IconButton
          icon={{ name: "plus", color: "#6B94E5" }}
          border="none"
          bgColor="white"
        />
      </TapAnimate>
      <TapAnimate onTapStart={handleClickZoomOut}>
        <IconButton
          icon={{ name: "minus", color: "#6B94E5" }}
          border="none"
          bgColor="white"
        />
      </TapAnimate>
    </motion.div>
  )
}

export default ZoomInOut

const TapAnimate = ({
  onTapStart,
  children,
}: {
  onTapStart: ComponentProps<typeof motion.div>["onTapStart"]
  children: ReactNode
}) => {
  return (
    <motion.div
      onTapStart={onTapStart}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      {children}
    </motion.div>
  )
}
