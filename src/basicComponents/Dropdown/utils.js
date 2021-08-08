import { offset } from 'dom-helpers'

import { PLACEMENTS } from '../Trigger'

export const getTranslate3d = (placementY, target) => {
  const targetOffset = offset(target)
  let translate3d = ''

  switch (placementY) {
    case PLACEMENTS.TOP:
      translate3d = `translate3d(0px, ${targetOffset.height / 2}px, 0px)`
      break

    case PLACEMENTS.BOTTOM:
      translate3d = `translate3d(0px, -${targetOffset.height / 2}px, 0px)`
      break
  }

  return translate3d
}

export const getPlacements = (placementX, placementY) => {
  const placements = {}
  const offset = 2

  switch (placementX) {
    case PLACEMENTS.LEFT:
      placements.targetPlacementX = PLACEMENTS.LEFT
      placements.sourcePlacementX = PLACEMENTS.LEFT
      break

    case PLACEMENTS.CENTER:
      placements.targetPlacementX = PLACEMENTS.CENTER
      placements.sourcePlacementX = PLACEMENTS.CENTER
      break

    case PLACEMENTS.RIGHT:
      placements.targetPlacementX = PLACEMENTS.RIGHT
      placements.sourcePlacementX = PLACEMENTS.RIGHT
      break
  }

  switch (placementY) {
    case PLACEMENTS.TOP:
      placements.targetPlacementY = PLACEMENTS.TOP
      placements.sourcePlacementY = PLACEMENTS.BOTTOM
      placements.offsetY = -offset
      break

    case PLACEMENTS.BOTTOM:
      placements.targetPlacementY = PLACEMENTS.BOTTOM
      placements.sourcePlacementY = PLACEMENTS.TOP
      placements.offsetY = offset
      break
  }

  return placements
}
