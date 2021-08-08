import * as Yup from 'yup'
import { getCurrentOrganization, getCurrentUserRole } from '@/utils/getUserInfo'
import { format } from 'date-fns'
import downloadReportUploadUrl, { downloadReportUpload } from '@/api/downloadReportUpload'
import { exportBlobFile, getFilename } from '@/utils/downloadFile'

export default props => {
  const userRole = getCurrentUserRole()
  const { isHighestRole } = userRole

  const today = format(new Date(), 'yyyy/MM/dd')

  const { organizationIdByDepartment } = getCurrentOrganization()

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      startDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
      endDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
    }),

    initialValues: {
      organizationId: isHighestRole ? 'all' : organizationIdByDepartment, // 最高權限預設為全單位，種子為該處
      startDate: today,
      endDate: today,
      isDescending: null, // 預設的排序由後端定義
      sortBy: 'lastDate', // 預設的排序由後端定義
    },

    onSubmit(data) {
      downloadReportUpload(downloadReportUploadUrl, { ...data }).then(({ data, headers }) => {
        exportBlobFile({ blob: data, fileName: getFilename(headers['content-disposition']) })
      })
    },
  }
}
