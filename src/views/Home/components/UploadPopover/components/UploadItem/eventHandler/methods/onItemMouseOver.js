export function onItemMouseOver({ event, currentLayoutState, setStateName, iconWrapperRef }) {
  const { current: currentIconWrapperRef } = iconWrapperRef
  const { onMouseEnterState, onMouseLeaveState } = currentLayoutState

  const iconArea = [currentIconWrapperRef, ...currentIconWrapperRef.querySelectorAll('*')]

  const isMouseOverIconArea = iconArea.some(item => item === event.target)
  const hasOnMouseEnterState = Boolean(onMouseEnterState)
  const hasOnMouseLeaveState = Boolean(onMouseLeaveState)

  if (isMouseOverIconArea && hasOnMouseEnterState) {
    setStateName(onMouseEnterState)
  } else if (!isMouseOverIconArea && hasOnMouseLeaveState) {
    setStateName(onMouseLeaveState)
  }
}
