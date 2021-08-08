export function getOrientation(file, callbackFunc) {
  const newReader = new FileReader()

  newReader.addEventListener('load', e => {
    const view = new DataView(e.target.result)

    if (view.getUint16(0, false) !== 0xffd8) return callbackFunc(-2)

    const length = view.byteLength

    let offset = 2

    while (offset < length) {
      const marker = view.getUint16(offset, false)

      offset += 2

      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          return callbackFunc(-1)
        }

        const little = view.getUint16((offset += 6), false) === 0x4949

        offset += view.getUint32(offset + 4, little)

        const tags = view.getUint16(offset, little)

        offset += 2

        for (let i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) === 0x0112) return callbackFunc(view.getUint16(offset + i * 12 + 8, little))
      } else if ((marker & 0xff00) !== 0xff00) break
      else offset += view.getUint16(offset, false)
    }

    return callbackFunc(-1)
  })
  newReader.readAsArrayBuffer(file.slice(0, 64 * 1024))
}
