import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Center, Flex, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import dayjs, { Dayjs } from 'dayjs'
import { motion } from 'framer-motion'
import { useGetReservationsInfiniteQuery } from '~/features/reservations'
import { useIntersectionObserver } from '~/hooks'
import { useScrollContainer } from '~/layouts'
import { useSetNavigation } from '~/layouts/Layout/navigations'
import { APICourt } from '~/types/domains/objects'
import { Context, ContextProps, useReservationTable } from './context'
import 'dayjs/locale/ko'

dayjs.locale('ko')

const DATE_QUERY_STRING_FORMAT = 'YYYY-MM-DD'

interface ReservationTableProps {
  courtId: APICourt['id']
  date: string
  children: (props: { dates: string[] }) => ReactNode
}

const ReservationTable = ({ courtId, date, children }: ReservationTableProps) => {
  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  const router = useRouter()

  const dayjsToday = dayjs()
  const dayjsDate = {
    Current: dayjs(`${date}`),
    Min: dayjsToday,
    Max: dayjs(dayjsToday.clone()).add(13, 'day'),
  }
  const [isNeedToScrollUnderDisabledCell] = useState(dayjs(`${date}`).tz('Asia/Seoul').diff(dayjsToday, 'm') < 0)

  const [dates, setDates] = useState([dayjsDate.Current.format(DATE_QUERY_STRING_FORMAT)])
  const vwElementRef = useRef<HTMLDivElement>(null)
  const [tableCellHeight, setTableCellHeight] = useState((vwElementRef.current?.clientWidth || 6) / 6)

  useEffect(() => {
    setTableCellHeight((vwElementRef.current?.clientWidth || 6) / 6)
  }, [vwElementRef.current?.clientWidth])

  const isReadyTableCellHeight = tableCellHeight > 10

  const replaceNewDate: ContextProps['replaceNewDate'] = useCallback(
    async (option, callback) => {
      if (
        (option === 'subtract' && dayjs(dates[0]).isBefore(dayjsDate.Min)) ||
        (option === 'add' && dayjs(dates[dates.length - 1]).isAfter(dayjsDate.Max))
      ) {
        if (typeof callback === 'function') {
          callback({ isAddedCells: false })
        }

        return
      }

      if (option === 'subtract') {
        setDates((prev) => {
          const subtractedDay = dayjs(prev[0]).subtract(1, 'day')
          getReservationsInfiniteQuery.fetchNextPage({
            pageParam: subtractedDay.toISOString(),
          })

          return [subtractedDay.format(DATE_QUERY_STRING_FORMAT), ...prev]
        })
      }
      if (option === 'add') {
        setDates((prev) => {
          const addedDay = dayjs(prev[prev.length - 1]).add(1, 'day')
          getReservationsInfiniteQuery.fetchNextPage({
            pageParam: addedDay.toISOString(),
          })

          return [...prev, addedDay.format(DATE_QUERY_STRING_FORMAT)]
        })
      }
      if (typeof callback === 'function') {
        await callback({ isAddedCells: true })
      }
    },
    [dates, dayjsDate.Max, dayjsDate.Min]
  )

  useEffect(() => {
    if (dayjsDate.Current.isBefore(dayjsDate.Min.subtract(1, 'day'))) {
      router.replace(`/reservations/courts/${courtId}?date=${dayjsDate.Min.format(DATE_QUERY_STRING_FORMAT)}`)
    }

    if (dayjsDate.Current.isAfter(dayjsDate.Max.add(1, 'day'))) {
      router.replace(`/reservations/courts/${courtId}?date=${dayjsDate.Max.format(DATE_QUERY_STRING_FORMAT)}`)
    }
  }, [date, courtId, router])

  const value = useMemo(
    () => ({ isNeedToScrollUnderDisabledCell, tableCellHeight, dates, setDates, replaceNewDate, courtId }),
    [isNeedToScrollUnderDisabledCell, tableCellHeight, dates, setDates, replaceNewDate, courtId]
  )

  return (
    <Context.Provider value={value}>
      <VStack ref={vwElementRef} w="100%" minH="100vh" align="stretch" position="relative" spacing={0}>
        {isReadyTableCellHeight ? children({ dates }) : <>readyTableCellHeight is required</>}
      </VStack>
    </Context.Provider>
  )
}

interface CellProps {
  timeNumber: number
  date: string
  onClick: (cellTime: { start: Dayjs; end: Dayjs }) => void
}

const Cell = ({ timeNumber, date, onClick }: CellProps) => {
  const scrollContainer = useScrollContainer()
  const theme = useTheme()
  const setNavigation = useSetNavigation()
  const { tableCellHeight, isNeedToScrollUnderDisabledCell } = useReservationTable()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  const hour = Math.floor(timeNumber / 2)
  const isOddTimeNumber = Math.abs(timeNumber % 2) === 0
  const isTop = hour === 0 && isOddTimeNumber
  const isBottom = hour === 23 && !isOddTimeNumber
  const hourLocaleString = hour.toLocaleString('es-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  const time = isOddTimeNumber ? `${hourLocaleString}:00` : `${hourLocaleString}:30`

  useEffect(() => {
    if (isTop && entry?.isIntersecting) {
      router.replace(`/reservations/courts/${router.query.courtId as string}?date=${date}`)
      setNavigation.title(date)
    }
    if (timeNumber === 36 && entry?.isIntersecting) {
      router.replace(`/reservations/courts/${router.query.courtId as string}?date=${date}`)
      setNavigation.title(date)
    }
  }, [entry?.isIntersecting])

  const cellTime = useMemo(() => {
    const start = dayjs(`${date}T${time}:00+09:00`).tz()

    return {
      start,
      end: start.add(30, 'minute'),
    }
  }, [date, time])

  const today = dayjs()
  const isDisabled = cellTime.start.isBefore(today)
  const diff = cellTime.start.diff(today, 'm')
  const isNeedToScrollToThisCell = diff > -15 && diff < 15

  const handleClick = useCallback(() => onClick(cellTime), [cellTime, onClick])

  useEffect(() => {
    // INTENTION: scroll to area under disabled cell to improve UX of user reservation flow
    if (ref.current && isNeedToScrollUnderDisabledCell && isNeedToScrollToThisCell) {
      const rect = ref.current.getBoundingClientRect()
      scrollContainer.to(rect.bottom + tableCellHeight * 3)
    }
  }, [])

  return (
    <Flex
      ref={ref}
      as={motion.div}
      onClick={isDisabled ? undefined : handleClick}
      whileTap={{ backgroundColor: theme.colors.gray0200 }}
      boxSizing="border-box"
      height={`${tableCellHeight}px`}
      borderTop={`${isTop ? 4 : isOddTimeNumber ? 1 : 0.5}px solid ${theme.colors.black}`}
      animate={{
        color: '#000000',
        filter: isDisabled ? 'contrast(0.2)' : undefined,
        backgroundColor: isDisabled ? theme.colors.gray0100 : undefined,
      }}
    >
      <Center flex={5}>
        <Box textAlign="center">
          {isTop && <div>{date}</div>}
          {cellTime.start.tz().format('HH:mm')}
          {' - '}
          {cellTime.end.tz().format('HH:mm')}
          {isBottom && <div>{date}</div>}
        </Box>
      </Center>
      <Center flex={1}>🏀</Center>
    </Flex>
  )
}

type CursorProps = {
  startTime: Dayjs
  endTime: Dayjs | null
}

const Cursor = ({ startTime, endTime }: CursorProps) => {
  const { tableCellHeight, dates } = useReservationTable()

  const diff = endTime?.diff(startTime, 'minute')
  const height = diff ? (tableCellHeight * diff) / 30 : tableCellHeight
  const topSensorHeight = tableCellHeight * 6
  const topMargin = (startTime.diff(dayjs(dates[0]).tz().startOf('d'), 'minute') / 30) * tableCellHeight

  return (
    <motion.div
      key={startTime.toString()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      css={css`
        position: absolute;
        top: ${topSensorHeight + topMargin}px;
        left: 0px;
        width: ${tableCellHeight * 5}px;
        height: ${height}px;
        overflow: hidden;
        background-color: #00000040;
        border-radius: ${endTime ? '16px' : '16px 16px 0 0'};
        pointer-events: none;
      `}
    >
      {startTime && (
        <Center
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 16px;
            color: white;
            background-color: black;
          `}
        >
          <Pin />
        </Center>
      )}
      {endTime && (
        <Center
          css={css`
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 16px;
            color: white;
            background-color: black;
          `}
        >
          <Pin />
        </Center>
      )}
    </motion.div>
  )
}

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

const SENSOR_MULTIPLY = 6

const Top = () => {
  const [isSensorOff, setIsSensorOff] = useState(false)
  const { replaceNewDate, tableCellHeight } = useReservationTable()
  const sensorRef = useRef<HTMLDivElement>(null)
  const sensorEntry = useIntersectionObserver(sensorRef, {
    threshold: 0.5,
  })
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      if (sensorEntry?.isIntersecting) {
        replaceNewDate('subtract', ({ isAddedCells }) => {
          document.getElementById('scrolled-container')?.scrollTo({
            top:
              // subtract이 실패한 경우(isAddedCells === false)(최소 날짜를 벗어난 요청의 경우, 14일 제한) 새로운 테이블을 받아오지 않았으므로
              (isAddedCells ? tableCellHeight * 48 : 0) + Math.abs(sensorRef.current?.getClientRects()[0].height || 0), // 스크롤이 센서의 바텀으로 되어야 함
          })

          if (!isAddedCells) {
            setIsSensorOff(true)
          }
        })
      }
    } else {
      document.getElementById('scrolled-container')?.scrollTo({ top: tableCellHeight * SENSOR_MULTIPLY })
    }
    isMounted.current = true
  }, [sensorEntry?.isIntersecting])

  if (isSensorOff) {
    return (
      <>
        <NoAccessScrollMaker />
        <NoAccess height={tableCellHeight * 1}>지난 날은 예약할 수 없습니다</NoAccess>
      </>
    )
  }

  return <MoreTableMaker ref={sensorRef} height={tableCellHeight} />
}

const NoAccessScrollMaker = () => {
  const ref = useRef(null)
  const theme = useTheme()
  const entry = useIntersectionObserver(ref, { threshold: 0.95 })
  const { tableCellHeight } = useReservationTable()

  useEffect(() => {
    if (entry?.isIntersecting) {
      document.getElementById('scrolled-container')?.scrollTo({ top: entry.boundingClientRect.bottom })
    }
  }, [entry?.isIntersecting])

  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${tableCellHeight * (SENSOR_MULTIPLY - 1)}px;
        color: ${theme.colors.gray0500};
        background-color: ${theme.colors.gray0200};
      `}
    />
  )
}

const Bottom = () => {
  const [isSensorOff, setIsSensorOff] = useState(false)
  const { replaceNewDate, tableCellHeight } = useReservationTable()
  const sensorRef = useRef<HTMLDivElement>(null)
  const sensorEntry = useIntersectionObserver(sensorRef, {})

  useEffect(() => {
    if (sensorEntry?.isIntersecting) {
      replaceNewDate('add', ({ isAddedCells }) => {
        if (!isAddedCells) {
          setIsSensorOff(true)
        }
      })
    }
  }, [sensorEntry?.isIntersecting])

  if (isSensorOff) {
    return <NoAccess height={tableCellHeight * 1}>오늘로부터 14일 후는 예약할 수 없습니다</NoAccess>
  }

  return <MoreTableMaker ref={sensorRef} height={tableCellHeight} />
}

const MoreCellSensor = {
  Top,
  Bottom,
}

const MoreTableMaker = styled.div<{
  height: number
}>`
  height: ${({ height }) => height * SENSOR_MULTIPLY}px;
  background-color: ${({ theme }) => theme.colors.gray0300};
`

const NoAccess = styled.div<{ height: number }>`
  ${({ theme, height }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${height}px;
    color: ${theme.colors.gray0500};
    background-color: ${theme.colors.gray0200};
  `}
`

const VerticalDivider = () => {
  const { tableCellHeight } = useReservationTable()

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        right: ${tableCellHeight}px;
        bottom: 0;
        width: 4px;
        background-color: black;
      `}
    />
  )
}

export default ReservationTable

ReservationTable.VerticalDivider = VerticalDivider
ReservationTable.MoreCellSensor = MoreCellSensor
ReservationTable.Cell = Cell
ReservationTable.Cursor = Cursor
