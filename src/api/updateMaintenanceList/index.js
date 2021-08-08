import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

// const url = 'media/maintain'

export function updateMaintenanceList(list) {
  return getService({
    config: {
      url: 'media/maintain/sorting',
      method: 'PUT',
      data: {
        data: list,
      },
    },
    name: 'UPDATE_MAINTENANCE_LIST',
    // transformResponse,
    // transformRequest,
  })
}

// export default url
