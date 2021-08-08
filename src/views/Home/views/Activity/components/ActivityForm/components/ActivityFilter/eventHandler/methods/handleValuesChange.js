export function handleValuesChange(setFieldValue, activityDateRange) {
  // 客戶要求輸入活動編號時，要忽略其他條件
  // 後端已經有做只要有活動編號就忽略其他條件的處理
  // 另外為了搜尋條件一致，前端的處理為活動編號變動時，就 reset 其他欄位
  // 反之，當其他欄位有異動時，就清空活動編號
  const { activityStartDate, activityEndDate } = activityDateRange

  const handleResetNumber = () => {
    setFieldValue('eventId', '')
  }

  const handleResetAllExceptEventId = () => {
    setFieldValue('organizationId', 'all')
    setFieldValue('placeId', 'all')
    setFieldValue('startDate', activityStartDate)
    setFieldValue('endDate', activityEndDate)
  }

  return {
    handleResetNumber,
    handleResetAllExceptEventId,
  }
}
