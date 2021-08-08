import getService from '../service'

// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/report/download/detail/export'

export function downloadReportDownloadDetail(url, { startDate, endDate }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        startDate,
        endDate,
      },
      responseType: 'blob',
    },
    name: 'DOWNLOAD_REPORT_DOWNLOAD_DETAIL',
  })
}

export default url
