import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

// const url = 'media/maintain'

export function updateMaintenanceItemName({ itemId, itemName }) {
  return getService({
    config: {
      url: 'media/maintain',
      // url,
      method: 'PUT',
      data: {
        itemId,
        itemName,
      },
    },
    name: 'UPDATE_MAINTENANCE_ITEM_NAME',
    // transformResponse,
    // transformRequest,
  })
}

// export default url
