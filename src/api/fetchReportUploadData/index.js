import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/report/upload'

export function fetchReportUploadData(url, { pageIndex, pageSize, startDate, endDate, organizationId, isDescending }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pageIndex, pageSize, startDate, endDate, organizationId, isDescending },
    },
    name: 'FETCH_REPORT_UPLOAD_DATA',
    transformRequest,
    transformResponse,
  })
}

export default url
