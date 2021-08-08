import { useState, useEffect, useRef } from 'react'

export function useCurrentDisplay(isMediaInfoFetched) {
  const [currentDisplay, setCurrentDisplay] = useState('')

  const isFirstRef = useRef(true)

  // didMount 完才 setCurrentDisplay，不然會得到 null
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
    } else {
      if (isMediaInfoFetched) {
        const newDisplay = document.getElementById(`media-display`)

        setCurrentDisplay(newDisplay)
      }
    }
  }, [isMediaInfoFetched])

  return { currentDisplay }
}
