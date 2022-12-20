import { Center } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { useReservationTable } from "../context"

type Props = {
  startTime: Dayjs
  endTime: Dayjs | null
}

const Cursor = ({ startTime, endTime }: Props) => {
  const { tableCellHeight, dates } = useReservationTable()

  const startDay = dayjs(startTime)
  const diff = endTime?.diff(startDay, "minute")
  const height = diff ? (tableCellHeight * diff) / 30 : tableCellHeight
  const topSensorHeight = tableCellHeight * 6
  const topMargin =
    (startDay.diff(dayjs(dates[0]), "minute") / 30) * tableCellHeight

  return (
    <motion.div
      key={startTime.toString()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      css={css`
        border-radius: ${endTime ? "16px" : "16px 16px 0 0"};
        width: ${tableCellHeight * 5}px;
        height: ${height}px;
        overflow: hidden;
        position: absolute;
        background-color: #00000040;
        top: ${topSensorHeight + topMargin}px;
        left: 0px;
        pointer-events: none;
      `}
    >
      {startTime && (
        <Center
          css={css`
            background-color: black;
            color: white;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 16px;
          `}
        >
          <Pin />
        </Center>
      )}
      {endTime && (
        <Center
          css={css`
            background-color: black;
            color: white;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 16px;
          `}
        >
          <Pin />
        </Center>
      )}
    </motion.div>
  )
}

export default Cursor

const Pin = () => {
  const theme = useTheme()

  return (
    <Center
      w="8px"
      h="8px"
      fontSize="6px"
      bgColor={theme.colors.white}
      color={theme.colors.gray0600}
      borderRadius="full"
    >
      ×
    </Center>
  )
}
