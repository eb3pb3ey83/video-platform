import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

// const url = 'media/maintain/'

export function createMaintenanceItem({ categoryId, itemName }) {
  return getService({
    config: {
      url: 'media/maintain',
      method: 'POST',
      data: {
        categoryId,
        itemName,
      },
    },
    name: 'CREATE_MAINTENANCE_ITEM',
    // transformResponse,
    // transformRequest,
  })
}

// export default url
