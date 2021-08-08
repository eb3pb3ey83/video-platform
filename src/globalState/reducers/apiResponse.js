import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_RESPONSE: 'SET_RESPONSE',
  RESET_STATUS: 'RESET_STATUS',
}

const initState = {
  isFetching: false,
  isResponseSuccess: false,
  isResponseFailed: false,
  errorData: {
    errors: {},
  },
  errorMessage: '',
  alertTitle: '',
  onClose: () => {},
}

function setResponse(state, { type, ...restData }) {
  return { ...state, ...restData }
}

function resetStatus() {
  return { ...initState }
}

const reducer = createReducer(initState, {
  [types.SET_RESPONSE]: setResponse,
  [types.RESET_STATUS]: resetStatus,
})

export default reducer
