import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

// const url = 'media/maintain/'

export function updateMaintenanceItemDelFlag({ itemId, delFlag }) {
  return getService({
    config: {
      url: 'media/maintain',
      // url,
      method: 'PATCH',
      data: {
        itemId,
        delFlag,
      },
    },
    name: 'UPDATE_MAINTENANCE_ITEM_DEL_FLAG',
    // transformResponse,
    // transformRequest,
  })
}

// export default url
