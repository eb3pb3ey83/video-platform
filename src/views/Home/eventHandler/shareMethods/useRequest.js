import { useEffect } from 'react'
import { useGlobalState } from '@/globalState'
import { types as apiTypes } from '@/globalState/reducers/apiResponse'

export let startRequest
export let setRequestSuccess
export let setRequestFailed

export function useRequest() {
  const [, dispatch] = useGlobalState()

  useEffect(() => {
    startRequest = ({ isShowAlert }) => {
      dispatch({
        type: apiTypes.SET_RESPONSE,
        isFetching: true,
        isShowAlert,
      })
    }

    setRequestSuccess = customConfig => {
      dispatch({
        type: apiTypes.SET_RESPONSE,
        isResponseSuccess: true,
        isFetching: false,
        ...customConfig,
      })
    }

    setRequestFailed = (error, customConfig) => {
      dispatch({
        type: apiTypes.SET_RESPONSE,
        isResponseFailed: true,
        errorData: error.data,
        errorMessage: error.message,
        isFetching: false,
        ...customConfig,
      })
    }
  }, [dispatch])
}
