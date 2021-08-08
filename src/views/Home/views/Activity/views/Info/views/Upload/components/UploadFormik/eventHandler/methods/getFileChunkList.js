export function getFileChunkList(file, chunkSize) {
  const totalChunkLength = Math.ceil(file.size / chunkSize)

  const fileChunkList = Array.from({ length: totalChunkLength }, (value, index) => {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunkBlob = file.slice(start, end, file.type)
    const fileChunk = new File([chunkBlob], file.name, {
      type: file.type,
    })

    return {
      file: fileChunk,
      contentRange: `bytes ${start}-${end - 1}/${file.size}`,
      offset: end,
    }
  })

  return fileChunkList
}
