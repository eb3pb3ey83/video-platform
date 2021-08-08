import getService from '../service'

import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/report/upload/export'

export function downloadReportUpload(url, { organizationId, startDate, endDate }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        organizationId,
        startDate,
        endDate,
      },
      responseType: 'blob',
    },
    name: 'DOWNLOAD_REPORT_UPLOAD',
    transformRequest,
  })
}

export default url
