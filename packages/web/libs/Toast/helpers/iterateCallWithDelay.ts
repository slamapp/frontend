const iterateCallWithDelay = (
  arr: ((...props: any[]) => any)[],
  delay: number
) => {
  const newArr = [...arr]

  function next() {
    // protect against empty array
    if (!newArr.length) {
      return
    }

    newArr.shift()?.()

    // schedule next iteration
    setTimeout(next, delay)
  }
  // start the iteration
  next()
}

export default iterateCallWithDelay
