import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/report/download'

export function fetchReportDownloadData(url, { pageIndex, pageSize, startDate, endDate, organizationId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pageIndex, pageSize, startDate, endDate, organizationId },
    },
    name: 'FETCH_REPORT_DOWNLOAD_DATA',
    transformRequest,
    transformResponse,
  })
}

export default url
