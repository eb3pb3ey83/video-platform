import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_ORGANIZATION_LIST: 'SET_ORGANIZATION_LIST',
}

const initState = {
  organizationList: [],
}

function setOrganizationList(state, action) {
  return { organizationList: action.organizationList }
}

const reducer = createReducer(initState, {
  [types.SET_ORGANIZATION_LIST]: setOrganizationList,
})

export default reducer
