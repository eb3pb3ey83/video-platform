export function getFilename(disposition) {
  const regex = /filename\*=UTF-8''(.*)?\.(.*)/gi
  const matches = regex.exec(disposition)
  let filename = new Date().toISOString()
  if (matches !== null && matches[1] && matches[2]) {
    filename = `${decodeURIComponent(matches[1])}.${matches[2]}`
  }
  return filename
}

export function getMediaFileName(disposition) {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const matches = filenameRegex.exec(disposition)

  if (matches != null && matches[1]) {
    const filename = matches[1].replace(/['"]/g, '')

    return decodeURIComponent(filename).replace(/utf-8/, '')
  }
}

export function exportBlobFile({ blob, fileName }) {
  const DownloadElement = document.createElement('a')
  const url = window.URL.createObjectURL(blob)

  DownloadElement.href = url
  DownloadElement.download = fileName
  document.body.appendChild(DownloadElement)
  DownloadElement.click()
  document.body.removeChild(DownloadElement)
}

export function exportFile(fileUrl) {
  const DownloadElement = document.createElement('a')
  const url = fileUrl

  DownloadElement.href = url
  DownloadElement.download = true
  document.body.appendChild(DownloadElement)
  DownloadElement.click()
  document.body.removeChild(DownloadElement)
}
