import { useState } from 'react'

export function usePopoverExpandState() {
  const [isPopoverExpand, setIsPopoverExpand] = useState(true)

  const handlePopoverExpandState = () => setIsPopoverExpand(isExpand => !isExpand)

  return { isPopoverExpand, handlePopoverExpandState }
}
