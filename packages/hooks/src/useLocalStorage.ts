import { useState } from 'react'

const useLocalStorage = <T = any>(key: string, initialValue: T): [storedValue: T, setValue: (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(
    typeof document !== 'undefined'
      ? () => {
          try {
            const item = localStorage.getItem(key)

            return item ? JSON.parse(item) : initialValue
          } catch (error) {
            console.error(error)

            return initialValue
          }
        }
      : initialValue
  )

  const setValue = (value: T) => {
    try {
      const valueToStore = typeof value === 'function' ? value(storedValue) : value

      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
