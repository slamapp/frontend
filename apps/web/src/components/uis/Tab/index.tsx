import type { PropsWithChildren } from 'react'
import { Children, createContext, isValidElement, useContext, useMemo, useState } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const TabContext = createContext({ tabName: '' })
TabContext.displayName = 'TabContext'
const useTab = () => useContext(TabContext)

const Tab = ({ children, defaultTabName }: PropsWithChildren<{ defaultTabName: string }>) => {
  const [tabName, setTabName] = useState(defaultTabName)

  const value = useMemo(() => ({ tabName }), [tabName])

  return (
    <TabContext.Provider value={value}>
      <HStack spacing={0}>
        {Children.map(children, (child) => {
          if (!isValidElement<PanelProps>(child)) {
            return null
          }

          const style = tabName === child.props.tabName ? { backgroundColor: '#000000', color: '#ffffff' } : {}

          return (
            <Box
              as={motion.div}
              borderRadius="50px"
              padding="8px 16px"
              flex={1}
              onClick={() => setTabName(child.props.tabName)}
              textAlign="center"
              fontWeight="bold"
              cursor="pointer"
              {...style}
              css={css`
                transition: 200ms;
              `}
            >
              {child.props.tabName}
            </Box>
          )
        })}
      </HStack>
      <div>{children}</div>
    </TabContext.Provider>
  )
}

type PanelProps = PropsWithChildren<{ tabName: string }>
const Panel = ({ tabName: panelTabName, children }: PanelProps) => {
  const { tabName } = useTab()

  return tabName === panelTabName ? <>{children}</> : null
}

export default Tab
Tab.Panel = Panel
