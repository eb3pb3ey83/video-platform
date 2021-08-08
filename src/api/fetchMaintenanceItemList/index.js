import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/maintain/category'

export function fetchMaintenanceItemList(url, { categoryId, all }) {
  return getService({
    config: {
      url: `${url}/${categoryId}/item`,
      method: 'GET',
      params: {
        categoryId,
        all,
      },
    },
    name: 'FETCH_MAINTENANCE_ITEM_LIST',
  })
}

export default url
