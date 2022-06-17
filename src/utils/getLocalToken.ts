const getLocalToken = (): string => {
  const tokenKey = process.env.NEXT_PUBLIC_SLAM_LOCAL_TOKEN_KEY as string
  const initialValue = ""

  try {
    const item = localStorage.getItem(tokenKey)

    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(error)

    return initialValue
  }
}

export default getLocalToken
