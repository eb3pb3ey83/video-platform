import React from 'react'
import { offset } from 'dom-helpers'

import { PLACEMENTS } from '@/basicComponents/Trigger'

export const getTranslate3d = (placement, target) => {
  const targetOffset = offset(target)
  let translate3d = ''

  switch (placement) {
    case PLACEMENTS.TOP:
      translate3d = `translate3d(0px, ${targetOffset.height / 2}px, 0px)`
      break

    case PLACEMENTS.RIGHT:
      translate3d = `translate3d(-${targetOffset.width / 2}px, 0px, 0px)`
      break

    case PLACEMENTS.BOTTOM:
      translate3d = `translate3d(0px, -${targetOffset.height / 2}px, 0px)`
      break

    case PLACEMENTS.LEFT:
      translate3d = `translate3d(${targetOffset.width / 2}px, 0px, 0px)`
      break
  }

  return translate3d
}

export const getPlacements = (placement, tipSize) => {
  let placements = {}
  const offset = 6 + Number(tipSize) / 2

  switch (placement) {
    case PLACEMENTS.TOP:
      placements = {
        targetPlacementX: PLACEMENTS.CENTER,
        targetPlacementY: PLACEMENTS.TOP,
        sourcePlacementX: PLACEMENTS.CENTER,
        sourcePlacementY: PLACEMENTS.BOTTOM,
        offsetY: -offset,
      }
      break

    case PLACEMENTS.RIGHT:
      placements = {
        targetPlacementX: PLACEMENTS.RIGHT,
        targetPlacementY: PLACEMENTS.CENTER,
        sourcePlacementX: PLACEMENTS.LEFT,
        sourcePlacementY: PLACEMENTS.CENTER,
        offsetX: offset,
      }
      break

    case PLACEMENTS.BOTTOM:
      placements = {
        targetPlacementX: PLACEMENTS.CENTER,
        targetPlacementY: PLACEMENTS.BOTTOM,
        sourcePlacementX: PLACEMENTS.CENTER,
        sourcePlacementY: PLACEMENTS.TOP,
        offsetY: offset,
      }
      break

    case PLACEMENTS.LEFT:
      placements = {
        targetPlacementX: PLACEMENTS.LEFT,
        targetPlacementY: PLACEMENTS.CENTER,
        sourcePlacementX: PLACEMENTS.RIGHT,
        sourcePlacementY: PLACEMENTS.CENTER,
        offsetX: -offset,
      }
      break
  }

  return placements
}

export const getTip = (placement, size, className) => {
  if (Number(size) === 0) return null

  let width = 0
  let height = 0
  let tip = null

  switch (placement) {
    case PLACEMENTS.TOP:
      width = size
      height = size / 2
      tip = <polygon points={`0, 0, ${height}, ${height}, ${width}, 0`} />
      break

    case PLACEMENTS.RIGHT:
      width = size / 2
      height = size
      tip = <polygon points={`${width}, 0, 0, ${width}, ${width}, ${height}`} />
      break

    case PLACEMENTS.BOTTOM:
      width = size
      height = size / 2
      tip = <polygon points={`0, ${height}, ${height}, 0, ${width}, ${height}`} />
      break

    case PLACEMENTS.LEFT:
      width = size / 2
      height = size
      tip = <polygon points={`0, 0, ${width}, ${width}, 0, ${height}`} />
      break
  }

  return (
    <svg className={className} width={width} height={height}>
      {tip}
    </svg>
  )
}
