import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_USER_AUTHORITY: 'SET_USER_AUTHORITY',
}

const initState = {
  userInfo: {},
  userAuthority: {},
}

function setUserInfo(state, action) {
  return { ...state, userInfo: action.userInfo }
}

function setUserAuthority(state, action) {
  return { ...state, userAuthority: action.userAuthority }
}

const reducer = createReducer(initState, {
  [types.SET_USER_INFO]: setUserInfo,
  [types.SET_USER_AUTHORITY]: setUserAuthority,
})

export default reducer
