import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

export function handleValuesChange(setFieldValue, activityDateRange) {
  // 客戶要求輸入檔案編號時，要忽略其他條件
  // 後端已經有做只要有檔案編號就忽略其他條件的處理
  // 另外為了搜尋條件一致，前端的處理為檔案編號變動時，就 reset 其他欄位
  // 反之，當其他欄位有異動時，就清空檔案編號
  const { activityStartDate, activityEndDate } = activityDateRange

  const handleResetNumber = () => {
    setFieldValue('fileNo', '')
  }

  const handleResetAllExceptFileNo = () => {
    setFieldValue('eventName', [])
    setFieldValue('keyword', [])
    setFieldValue('mediaType', '')
    setFieldValue('accessAuthority', ACCESS_AUTHORITY.ALL)
    setFieldValue('organizationId', 'all')
    setFieldValue('placeId', 'all')
    setFieldValue('projectNo', '')
    setFieldValue('startDate', activityStartDate)
    setFieldValue('endDate', activityEndDate)
  }

  return {
    handleResetNumber,
    handleResetAllExceptFileNo,
  }
}
