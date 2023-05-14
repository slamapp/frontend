import { useMemo, useRef, useState } from 'react'
import { useTheme } from '@emotion/react'
import { Box, Stack } from '@jsxcss/emotion'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

const week = ['일', '월', '화', '수', '목', '금', '토'] as const

const DAY_RANGE = 14

const DATE_ITEM_GAP = 16
const DATE_ITEM_WIDTH = 58

const SUNDAY_INDEX = 0
const SATURDAY_INDEX = 6

interface Props {
  initialValue?: Dayjs
  onChange: (date: Dayjs) => void
}

const DatePicker = ({ initialValue, onChange }: Props) => {
  const theme = useTheme()
  const [selectedDate, setSelectedDate] = useState(
    initialValue || (() => dayjs().tz().hour(0).minute(0).second(0).millisecond(0))
  )

  const twoWeekDates = useMemo(
    () => Array.from({ length: DAY_RANGE }, (_, index) => selectedDate.add(index, 'day')),
    []
  )

  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div ref={ref} whileTap={{ cursor: 'grabbing' }} css={{ position: 'relative', margin: `12px 0` }}>
      <Stack.Horizontal
        as={motion.div}
        marginLeft={DATE_ITEM_GAP}
        spacing={DATE_ITEM_GAP}
        drag="x"
        dragConstraints={{
          right: 0,
          left: -(DATE_ITEM_GAP * 3 + (DATE_ITEM_WIDTH + DATE_ITEM_GAP) * 14) + (ref.current?.offsetWidth || 0),
        }}
      >
        {twoWeekDates.map((date, index) => {
          const selected = date.isSame(selectedDate)
          const dayOfWeekIndex = date.day()

          return (
            <Stack.Vertical
              key={date.toISOString()}
              as={motion.div}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: index / 50 } }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              backgroundColor={theme.colors[selected ? 'black' : 'white']}
              boxShadow="0 8px 32px -16px #00000040"
              borderRadius="12px"
              onClick={() => {
                setSelectedDate(date)
                onChange(date)
              }}
            >
              <Stack.Vertical align="center" width={DATE_ITEM_WIDTH} spacing={2} padding="8px 0">
                <Box
                  fontSize={16}
                  fontWeight="bold"
                  color={
                    dayOfWeekIndex === SUNDAY_INDEX
                      ? theme.colors.red0300
                      : dayOfWeekIndex === SATURDAY_INDEX
                      ? theme.colors.blue0300
                      : selected
                      ? 'white'
                      : theme.colors.gray0700
                  }
                >
                  {week[dayOfWeekIndex]}
                </Box>
                <Box fontSize={21} fontWeight="bold" color={theme.colors[selected ? 'white' : 'gray0900']}>
                  {date.date()}
                </Box>
              </Stack.Vertical>
            </Stack.Vertical>
          )
        })}
      </Stack.Horizontal>
      <GradientCover position="left" />
      <GradientCover position="right" />
    </motion.div>
  )
}

export default DatePicker

const GradientCover = ({ position }: { position: 'left' | 'right' }) => {
  const theme = useTheme()

  return (
    <Box
      as={motion.div}
      width={DATE_ITEM_GAP}
      position="absolute"
      top={0}
      bottom={0}
      left={position === 'left' ? 0 : undefined}
      right={position === 'right' ? 0 : undefined}
      background={
        position === 'left'
          ? `linear-gradient(0.25turn,${theme.colors.gray0050},transparent)`
          : `linear-gradient(0.25turn,transparent,${theme.colors.gray0050})`
      }
      pointerEvents="none"
    />
  )
}
