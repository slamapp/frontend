import { useEffect, useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { css, useTheme } from '@emotion/react'
import { Box } from '@jsxcss/emotion'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollContainer } from '~/layouts'
import { useSetNavigation } from '../../navigations'

const PageLoader = () => {
  const theme = useTheme()
  const router = useRouter()

  const visiteds = useRef<{ [pathname: string]: true }>({
    [router.pathname]: true,
  })
  const [isProgressBar, setIsProgressBar] = useState(false)

  const scrollContainer = useScrollContainer()
  const setNavigation = useSetNavigation()

  useEffect(() => {
    const progressBarOn = (url: string) => {
      const nextPathname = url.split('?')[0]
      if (!visiteds.current[nextPathname]) {
        setIsProgressBar(true)
        setNavigation.all((prev) => ({
          ...prev,
        }))
        visiteds.current[nextPathname] = true
      }
    }

    const progressBarOff = () => {
      setIsProgressBar(false)
      setNavigation.all((prev) => ({
        ...prev,
      }))
    }

    Router.events.on('routeChangeStart', progressBarOn)
    Router.events.on('routeChangeComplete', progressBarOff)
    Router.events.on('routeChangeError', progressBarOff)

    return () => {
      Router.events.off('routeChangeStart', progressBarOn)
      Router.events.off('routeChangeComplete', progressBarOff)
      Router.events.off('routeChangeError', progressBarOff)
    }
  }, [router.pathname])

  return (
    <AnimatePresence mode="wait">
      {isProgressBar && (
        <Box
          as={motion.div}
          initial={{ backgroundColor: '#e8e8e800' }}
          animate={{ backgroundColor: '#e8e8e8' }}
          exit={{ backgroundColor: '#e8e8e800' }}
          position="fixed"
          width={scrollContainer.width}
          height="100%"
        >
          <Box
            as={motion.div}
            animate={{
              width: ['0%', '80%', '81%', '82%', '83%', '84%', '85%', '86%', '87%', '88%', '89%', '90%'],
              transition: { duration: 10 },
            }}
            exit={{ width: `100%`, height: 0 }}
            position="absolute"
            top={0}
            height={8}
            borderRadius="0 16px 16px 0"
            background={`linear-gradient(to right, ${theme.colors.gray0100} 8%, ${theme.colors.gray0500} 18%, ${theme.colors.gray0100} 33%)`}
            backgroundSize="800px 100px"
            css={css`
              animation-name: placeHolderShimmer;
              animation-duration: 2s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              animation-fill-mode: forwards;
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
        </Box>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
