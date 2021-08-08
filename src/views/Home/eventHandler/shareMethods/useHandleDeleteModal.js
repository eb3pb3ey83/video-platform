import { useState } from 'react'

export function useHandleDeleteModal() {
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
  const toggleAlert = () => setIsShowDeleteAlert(prevState => !prevState)

  return { isShowDeleteAlert, toggleAlert }
}
