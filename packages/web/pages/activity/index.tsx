import React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { useNavigationContext } from "~/contexts/hooks"

const Activity: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_ACTIVITY")

  return (
    <div>
      <Head>
        <title>활동 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      Activity
    </div>
  )
}

export default Activity
