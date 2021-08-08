import getService from '../service'

// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/report/download/export'

export function downloadReportDownload(url, { startDate, endDate }) {
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
    name: 'DOWNLOAD_REPORT_DOWNLOAD',
  })
}

export default url
