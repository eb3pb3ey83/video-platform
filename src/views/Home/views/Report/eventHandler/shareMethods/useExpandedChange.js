import { useState } from 'react'

export function useExpandedChange() {
  const [expanded, setExpanded] = useState({})

  const handleExpandTable = index => {
    setExpanded({ [index]: !expanded[index] })
  }

  return { handleExpandTable, expanded }
}
