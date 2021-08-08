import getService from '../service'

// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/report/view/export'

export function downloadReportView(url, { startDate, endDate }) {
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
    name: 'DOWNLOAD_REPORT_VIEW',
  })
}

export default url
