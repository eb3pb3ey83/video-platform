import * as Yup from 'yup'
import { format } from 'date-fns'
import downloadReportDownloadUrl, { downloadReportDownload } from '@/api/downloadReportDownload'
import downloadReportDownloadDetailUrl, { downloadReportDownloadDetail } from '@/api/downloadReportDownloadDetail'
import { exportBlobFile, getFilename } from '@/utils/downloadFile'
import { EXPORT_TYPE } from '../../../../shareConstants/EXPORT_TYPE'

export default props => {
  const today = format(new Date(), 'yyyy/MM/dd')

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
      startDate: today,
      endDate: today,
    },

    onSubmit(data) {
      const { exportType } = data

      switch (exportType) {
        case EXPORT_TYPE.NORMAL:
          downloadReportDownload(downloadReportDownloadUrl, { ...data }).then(({ data, headers }) => {
            exportBlobFile({ blob: data, fileName: getFilename(headers['content-disposition']) })
          })
          break
        case EXPORT_TYPE.DETAIL:
          downloadReportDownloadDetail(downloadReportDownloadDetailUrl, { ...data }).then(({ data, headers }) => {
            exportBlobFile({ blob: data, fileName: getFilename(headers['content-disposition']) })
          })
          break
        default:
          break
      }
    },
  }
}
