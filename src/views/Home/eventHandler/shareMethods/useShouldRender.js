import { useState, useEffect } from 'react'
import { useGlobalState } from '@/globalState'
import { isEmpty } from 'lodash'

export function useShouldRender(navigations) {
  const [state] = useGlobalState()
  const [currentNavigations, setCurrentNavigations] = useState([])

  const { user } = state
  const { userAuthority } = user

  useEffect(() => {
    if (isEmpty(userAuthority)) return

    // 把沒有權限的過濾掉
    const newNavigations = navigations.filter(item => item.feature.some(item => userAuthority[item]) === true)

    setCurrentNavigations(newNavigations)
  }, [navigations, userAuthority])

  return currentNavigations
}
