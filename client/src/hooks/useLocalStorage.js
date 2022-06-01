import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  //SSR Next.js
  if(typeof window === 'undefined') return initValue

  // if value is already stored
  const localValue = JSON.parse(localStorage.getItem(key))
  if(localValue) return localValue

  //return result of func
  if(initValue instanceof Function) return initValue()

  return initValue
}

export const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}