import { useState } from 'react'

export function useIsCollapsedMethod() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return {
    isCollapsed,
    handleOnCollapse: (event, isCollapsed) => setIsCollapsed(isCollapsed),
  }
}
