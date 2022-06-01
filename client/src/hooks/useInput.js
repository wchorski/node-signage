import { useLocalStorage } from "./useLocalStorage";

export const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue)

  const reset = () => setValue(initValue)

  const attributeObj = {
    value: value,
    onChange: (e) => setValue(e.target.value)
  }

  return [value, reset, attributeObj]
}