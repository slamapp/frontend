import React, { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from "next"
import styled from "@emotion/styled"
import { NewCourtItem, Modal } from "~/components/domains"
import { Spacer } from "~/components/uis/atoms"
import { Tab } from "~/components/uis/templates"
import { useNavigationContext } from "~/contexts/hooks"
import managementApi from "~/service/managementApi"
import type { APINewCourt } from "~/types/domains"

const NewCourtsPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_ADMIN_NEWCOURTS")

  const [readyNewCourtData, setReadyNewCourtData] = useState<APINewCourt[]>([])
  const [doneData, setDoneData] = useState<APINewCourt[]>([])
  const [currentLastId, setCurrentLastId] = useState<APINewCourt["id"] | null>(
    null
  )
  const [activeStatus, setActiveStatus] =
    useState<APINewCourt["newCourt"]["status"]>("READY")
  const [isFetching, setIsFetching] = useState(false)
  const [isOpenDenyModal, setIsOpenDenyModal] = useState(false)
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false)

  const loadMore = useCallback(
    async (status: APINewCourt["newCourt"]["status"]) => {
      if (
        readyNewCourtData.length === 0 ||
        isFetching ||
        currentLastId === null
      ) {
        return
      }

      try {
        setIsFetching(true)
        const {
          data: { contents, lastId },
        } = await managementApi.getReadyNewCourts(!currentLastId, currentLastId)
        if (status === "READY") {
          setReadyNewCourtData((prev) => [...prev, ...contents])
        } else {
          setDoneData((prev) => [...prev, ...contents])
        }
        setCurrentLastId(lastId)
      } catch (error) {
        console.error(error)
      }

      setIsFetching(false)
    },
    [currentLastId, isFetching, readyNewCourtData.length]
  )

  const getNewCourts = useCallback(
    async (status: APINewCourt["newCourt"]["status"]) => {
      try {
        setIsFetching(true)
        const {
          data: { contents, lastId },
        } = await managementApi.getReadyNewCourts(!currentLastId, currentLastId)
        if (status === "READY") {
          setReadyNewCourtData((prev) => [...prev, ...contents])
        } else {
          setDoneData((prev) => [...prev, ...contents])
        }
        setCurrentLastId(lastId)
      } catch (error) {
        console.error(error)
      }

      setIsFetching(false)
    },
    [currentLastId, isFetching, readyNewCourtData.length]
  )

  const handleClick = (status: APINewCourt["newCourt"]["status"]) => {
    if (activeStatus === status) {
      return
    }

    setCurrentLastId(null)
    setReadyNewCourtData([])
    setDoneData([])
    setActiveStatus(status)
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getNewCourts(activeStatus)
  }, [activeStatus])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore(activeStatus)
          }
        })
      },
      { threshold: 1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, activeStatus, getNewCourts])

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
      <Tab onClick={handleClick}>
        <Tab.Item title="처리 대기" index="READY">
          <Container>
            <Spacer gap="base">
              {readyNewCourtData.map((newCourt) => (
                <NewCourtItem
                  key={newCourt.id}
                  newCourt={newCourt}
                  state="READY"
                  setIsOpenAcceptModal={setIsOpenAcceptModal}
                  setIsOpenDenyModal={setIsOpenDenyModal}
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
        <Tab.Item title="처리 완료" index="DONE">
          <Container>
            <Spacer gap="base">
              {doneData.map((newCourt) => (
                <NewCourtItem
                  key={newCourt.id}
                  newCourt={newCourt}
                  state="DONE"
                />
              ))}
            </Spacer>
          </Container>
        </Tab.Item>
      </Tab>
      {readyNewCourtData.length === 0 ||
        (doneData.length === 0 && <div style={{ flex: 1 }}></div>)}
      <div ref={ref} style={{ height: 10 }}></div>

      <Modal
        visible={isOpenDenyModal}
        onClose={() => setIsOpenDenyModal(false)}
      >
        <Modal.Header>거절이 완료되었습니다.</Modal.Header>
      </Modal>

      <Modal
        visible={isOpenAcceptModal}
        onClose={() => setIsOpenAcceptModal(false)}
      >
        <Modal.Header>승인이 완료되었습니다.</Modal.Header>
      </Modal>
    </div>
  )
}

export default NewCourtsPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: ${({ theme }) => theme.gaps.base};
`
