import { format } from 'date-fns'

const options = { locale: require('date-fns/locale/zh-CN') }

export const FORMAT = {
  DATE: 'yyyy/MM/dd',
  DATE_WEEK: 'yyyy/MM/dd E',
  TIME: 'HH:mm',
  FULL_DATE_TIME: 'yyyy-MM-dd HH:mm:ss',
}

// Using Date alternate constructor to fix IE issue
// ref: https://stackoverflow.com/questions/13091523/javascript-invalid-date-error-in-internet-explorer
// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// 在 IE 用原本的 format (`yyyy-mm-dd HH:mm:ss`) 一個字串參數，放進 Date 的建構式裡面，會回傳 Invalid Date
// 所以改用參數個別丟的方式，(yyyy, mm, dd, HH, mm, ss) 共六個數字參數，放進 Date 的建構式，才會回傳正確的 Date instance
// 此函式也接受只有日期的字串，如 `yyyy-mm-dd`，回傳的 Date instance 的時間為 00:00:00 (建構式的預設行為)
// 另外，也對這個函式做了一些防呆機制
export const parseDateTimeStringToInstance = dateTime => {
  if (typeof dateTime === 'undefined' || dateTime === null) return new Date()
  if (dateTime instanceof Date) return dateTime
  if (typeof dateTime !== 'string') {
    console.warn('Date time string is not a string.')
    return dateTime
  }

  const dateRegex = /^([\d]{4}).?([\d]{2}).?([\d]{2}).?/
  const dateTimeRegex = /^([\d]{4}).?([\d]{2}).?([\d]{2}).?([\d]{2}).?([\d]{2}).?([\d]{2}).?/
  const dateMatch = dateTime.match(dateRegex)
  const dateTimeMatch = dateTime.match(dateTimeRegex)

  // match 解出來的 month 為實際的月份
  // 但 alternate constructor 的第二個參數為 monthIndex，使用時需比實際的月份少一
  if (dateMatch === null && dateTimeMatch === null) {
    console.warn('Date time string is not a valid format.')
    return new Date()
  } else if (dateTimeMatch !== null) {
    const [, ...dateTimes] = dateTimeMatch
    const [year, month, day, hours, minutes, seconds] = dateTimes.map(dateTime => Number(dateTime))

    return new Date(year, month - 1, day, hours, minutes, seconds)
  } else if (dateMatch !== null) {
    const [, ...dates] = dateMatch
    const [year, month, day] = dates.map(date => Number(date))

    return new Date(year, month - 1, day)
  }
}

export const date = dateTime => format(parseDateTimeStringToInstance(dateTime), FORMAT.DATE, options)

export const dateWeek = dateTime => format(parseDateTimeStringToInstance(dateTime), FORMAT.DATE_WEEK, options)

export const time = dateTime => format(parseDateTimeStringToInstance(dateTime), FORMAT.TIME, options)

export const dateTime = (dateTime, { separator = ' ' } = {}) =>
  `${date(parseDateTimeStringToInstance(dateTime), FORMAT.DATE, options)}${separator}${time(
    parseDateTimeStringToInstance(dateTime),
    FORMAT.TIME,
    options,
  )}`

export const fullDateTime = dateTime => format(parseDateTimeStringToInstance(dateTime), FORMAT.FULL_DATE_TIME, options)

export const period = (start, end, { type = 'time', splitter = '-', separator = ' ' } = {}) => {
  let result = ''

  switch (type) {
    case 'time':
      result = `${time(start)} ${splitter} ${time(end)}`
      break

    case 'same-day':
      result = `${date(start)}${separator}${time(start)} ${splitter} ${time(end)}`
      break

    case 'diff-day':
      result = `${date(start)}${separator}${time(start)} ${splitter} ${date(end)}${separator}${time(end)}`
      break
  }

  return result
}
