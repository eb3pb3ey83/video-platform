import { useState } from 'react'

export function useHandlePopoverMode() {
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)

  const togglePopoverMode = state => setIsPopoverOpened(state)

  return { isPopoverOpened, togglePopoverMode }
}
