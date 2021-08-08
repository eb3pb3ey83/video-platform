import { useState } from 'react'

export function useHandleEditMode() {
  const [isEditMode, setIsEditMode] = useState(false)
  const toggleEditMode = () => setIsEditMode(prevState => !prevState)

  return { isEditMode, toggleEditMode }
}
