export function canDisplayFileType(format) {
  if (!format) return false
  format = format.toLowerCase()

  const canDisplayVideo = [
    /mov$/,
    /mp4$/,
    /m2ts$/,
    /ts$/,
    /f4v$/,
    /mkv$/,
    /m4v$/,
    /mpeg$/,
    /mxf$/,
    /wmv$/,
    /webm$/,
    /vob$/,
    /mts$/,
    /mpg$/,
    /flv$/,
    /avi$/,
  ]

  const canDisplayImage = [/svg$/, /png$/, /gif$/, /ico$/, /bmp$/, /jpg$/, /jpeg$/, /webp$/]

  const isValidVideo = Boolean(canDisplayVideo.find(acceptType => format.match(acceptType)))
  const isValidImage = Boolean(canDisplayImage.find(acceptType => format.match(acceptType)))

  return { isValidVideo, isValidImage }
}
