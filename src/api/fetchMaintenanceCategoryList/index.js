import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/maintain/category'

export function fetchMaintenanceICategoryList(url) {
  return getService({
    config: {
      url,
      method: 'GET',
    },
    name: 'FETCH_MAINTENANCE_CATEGORY_LIST',
  })
}

export default url
