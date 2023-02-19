import { useMemo, useRef, useState } from 'react'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import dayjs, { Dayjs } from 'dayjs'
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
    <motion.div
      ref={ref}
      whileTap={{ cursor: 'grabbing' }}
      css={css`
        position: relative;
        margin: 12px 0;
      `}
    >
      <HStack
        as={motion.div}
        ml={`${DATE_ITEM_GAP}px`}
        spacing={`${DATE_ITEM_GAP}px`}
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
            <VStack
              key={date.toISOString()}
              as={motion.div}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: index / 50 } }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              bgColor={theme.colors[selected ? 'black' : 'white']}
              transition="background-color border 200ms"
              boxShadow="0 8px 32px -16px #00000040"
              borderRadius="12px"
              onClick={() => {
                setSelectedDate(date)
                onChange(date)
              }}
            >
              <VStack w={`${DATE_ITEM_WIDTH}px`} spacing="2px" py="8px">
                <Text
                  fontSize="16px"
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
                </Text>
                <Text fontSize="21px" fontWeight="bold" color={theme.colors[selected ? 'white' : 'gray0900']}>
                  {date.date()}
                </Text>
              </VStack>
            </VStack>
          )
        })}
      </HStack>
      <GradientCover position="left" />
      <GradientCover position="right" />
    </motion.div>
  )
}

export default DatePicker

const GradientCover = ({ position }: { position: 'left' | 'right' }) => {
  const theme = useTheme()

  return (
    <motion.div
      css={css`
        position: absolute;
        top: 0;
        bottom: 0;
        width: ${DATE_ITEM_GAP}px;
        background: ${position === 'left'
          ? `linear-gradient(0.25turn,${theme.colors.gray0050},transparent)`
          : `linear-gradient(0.25turn,transparent,${theme.colors.gray0050})`};
        pointer-events: none;
        ${position}: 0;
      `}
    />
  )
}
