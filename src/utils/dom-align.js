import { position } from 'dom-helpers'

export const PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  CENTER: 'center',
}

function setStyle(element, property, value) {
  element.style[property] = value
}

function setPotision(element, positions) {
  for (const [position, value] of Object.entries(positions)) setStyle(element, position, `${value}px`)
}

function alignElement(target, source, options) {
  const {
    targetPlacementX = PLACEMENTS.LEFT,
    targetPlacementY = PLACEMENTS.TOP,
    sourcePlacementX = PLACEMENTS.LEFT,
    sourcePlacementY = PLACEMENTS.TOP,
    offsetX = 0,
    offsetY = 0,
  } = options

  if (!(target instanceof Element && source instanceof Element)) {
    throw new Error('The parameters of target and source must be instanceof DOM Element.')
  }

  setStyle(target, 'position', 'relative')
  // set display to inline-block to make element's width property correctly
  setStyle(source, 'display', 'inline-block')
  setStyle(source, 'position', 'absolute')

  const targetCoords = position(target, target.parentNode)
  const sourceCoords = position(source, target)

  const positions = {}

  switch (true) {
    case targetPlacementX === PLACEMENTS.LEFT && sourcePlacementX === PLACEMENTS.LEFT:
      positions.left = 0
      break

    case targetPlacementX === PLACEMENTS.LEFT && sourcePlacementX === PLACEMENTS.CENTER:
      positions.left = Math.round(-sourceCoords.width / 2)
      break

    case targetPlacementX === PLACEMENTS.LEFT && sourcePlacementX === PLACEMENTS.RIGHT:
      positions.left = Math.round(-sourceCoords.width)
      break

    case targetPlacementX === PLACEMENTS.CENTER && sourcePlacementX === PLACEMENTS.LEFT:
      positions.left = Math.round(targetCoords.width / 2)
      break

    case targetPlacementX === PLACEMENTS.CENTER && sourcePlacementX === PLACEMENTS.CENTER:
      positions.left = Math.round(targetCoords.width / 2 - sourceCoords.width / 2)
      break

    case targetPlacementX === PLACEMENTS.CENTER && sourcePlacementX === PLACEMENTS.RIGHT:
      positions.left = Math.round(targetCoords.width / 2 - sourceCoords.width)
      break

    case targetPlacementX === PLACEMENTS.RIGHT && sourcePlacementX === PLACEMENTS.LEFT:
      positions.left = Math.round(targetCoords.width)
      break

    case targetPlacementX === PLACEMENTS.RIGHT && sourcePlacementX === PLACEMENTS.CENTER:
      positions.left = Math.round(targetCoords.width - sourceCoords.width / 2)
      break

    case targetPlacementX === PLACEMENTS.RIGHT && sourcePlacementX === PLACEMENTS.RIGHT:
      positions.left = Math.round(targetCoords.width - sourceCoords.width)
      break
  }

  switch (true) {
    case targetPlacementY === PLACEMENTS.TOP && sourcePlacementY === PLACEMENTS.TOP:
      positions.top = 0
      break

    case targetPlacementY === PLACEMENTS.TOP && sourcePlacementY === PLACEMENTS.CENTER:
      positions.top = Math.round(-sourceCoords.height / 2)
      break

    case targetPlacementY === PLACEMENTS.TOP && sourcePlacementY === PLACEMENTS.BOTTOM:
      positions.top = Math.round(-sourceCoords.height)
      break

    case targetPlacementY === PLACEMENTS.CENTER && sourcePlacementY === PLACEMENTS.TOP:
      positions.top = Math.round(targetCoords.height / 2)
      break

    case targetPlacementY === PLACEMENTS.CENTER && sourcePlacementY === PLACEMENTS.CENTER:
      positions.top = Math.round(targetCoords.height / 2 - sourceCoords.height / 2)
      break

    case targetPlacementY === PLACEMENTS.CENTER && sourcePlacementY === PLACEMENTS.BOTTOM:
      positions.top = Math.round(targetCoords.height / 2 - sourceCoords.height)
      break

    case targetPlacementY === PLACEMENTS.BOTTOM && sourcePlacementY === PLACEMENTS.TOP:
      positions.top = Math.round(targetCoords.height)
      break

    case targetPlacementY === PLACEMENTS.BOTTOM && sourcePlacementY === PLACEMENTS.CENTER:
      positions.top = Math.round(targetCoords.height - sourceCoords.height / 2)
      break

    case targetPlacementY === PLACEMENTS.BOTTOM && sourcePlacementY === PLACEMENTS.BOTTOM:
      positions.top = Math.round(targetCoords.height - sourceCoords.height)
      break
  }

  positions.left = positions.left + offsetX
  positions.top = positions.top + offsetY

  positions.left = -64 // TODO: 暫時寫死，但未來要修改上面公式以符合此專案

  setPotision(source, positions)
}

export { alignElement }
export default { element: alignElement }
