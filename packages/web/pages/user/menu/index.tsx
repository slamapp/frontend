import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useRouter } from "next/router"
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { AnimatePresence, motion } from "framer-motion"
import { Button, Icon, LayerOver } from "~/components/uis"
import { useNavigationContext } from "~/contexts/hooks"
import { useTokenCookie } from "~/hooks/domain"
import { useScrollContainer } from "~/layouts"

interface Props {
  buildTime: string
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  buildTime,
}) => {
  const router = useRouter()
  const tokenCookie = useTokenCookie()
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_MENU")
  const { scrollContainerWidth } = useScrollContainer()
  const queryClient = useQueryClient()

  const logout = () => {
    tokenCookie.remove()
    localStorage.clear()
    queryClient.clear()
  }

  return (
    <Flex flexDir="column" h="100%">
      <VStack align="stretch" flex={1}>
        <LayerOver
          trigger={({ open }) => (
            <MenuItem onClick={open}>
              <Icon name="log-out" /> 로그아웃
            </MenuItem>
          )}
          layer={({ close, isOpen }) => (
            <AnimatePresence mode="wait">
              {isOpen && (
                <Center
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  pos="fixed"
                  top={0}
                  bottom={0}
                  left={0}
                  right={0}
                  backdropFilter="blur(3px)"
                >
                  <Box
                    onClick={close}
                    pos="fixed"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bgColor="#00000005"
                    zIndex={-1}
                  />
                  <Box
                    width="90%"
                    maxWidth={`${scrollContainerWidth - 60}px`}
                    bgColor="white"
                    borderRadius="16px"
                    p="16px"
                    boxShadow="0 8px 32px -16px #00000020"
                  >
                    <VStack align="stretch" spacing="24px">
                      <Text>정말 로그아웃할까요? 🤔</Text>
                      <Flex justify="space-between">
                        <Button scheme="white" onClick={() => close()}>
                          닫기
                        </Button>
                        <Button
                          onClick={() => {
                            logout()
                            close()
                            router.replace("/login")
                          }}
                        >
                          로그아웃하기
                        </Button>
                      </Flex>
                    </VStack>
                  </Box>
                </Center>
              )}
            </AnimatePresence>
          )}
        />
      </VStack>
      <div>
        {dayjs(buildTime).format("빌드 버전: YYYY년 MM월 DD일 HH시 MM분 ss초")}
      </div>
    </Flex>
  )
}

export default Page

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background 200ms;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray0050};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray0100};
  }
  &:focus {
    background: ${({ theme }) => theme.colors.gray0200};
  }
  &:active {
    background: ${({ theme }) => theme.colors.gray0300};
  }
`

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      buildTime: new Date().toISOString(),
    },
  }
}
