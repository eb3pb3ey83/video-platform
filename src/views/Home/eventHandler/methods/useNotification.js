import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

const findNavigationsIndexByName = (navigations, name) => navigations.findIndex(nav => nav.name === name)

export function useNotification(navigations, hasApplicationRecordData) {
  const [currentNavigations, setCurrentNavigations] = useState([])

  useEffect(() => {
    if (isEmpty(navigations)) return

    navigations[findNavigationsIndexByName(navigations, '管理中心')].hasNotification = hasApplicationRecordData

    setCurrentNavigations(navigations)
  }, [hasApplicationRecordData, navigations])

  return currentNavigations
}
