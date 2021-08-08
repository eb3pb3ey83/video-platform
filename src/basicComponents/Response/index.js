import React, { useEffect, useCallback } from 'react'
// import PropTypes from 'prop-types'
import { useGlobalState } from '@/globalState'
import { types as apiTypes } from '@/globalState/reducers/apiResponse'
// import classnames from 'classnames/bind'
// import styles from './style.module.scss'

// Components
import Icon from '@/basicComponents/Icon'
import Typography from '@/basicComponents/Typography'
import AlertModal from '@/basicComponents/AlertModal'
import IconModal from '@/basicComponents/IconModal'
import Spinner from '@/basicComponents/Spinner'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function Response(props) {
  const [state, dispatch] = useGlobalState()
  const { apiResponse } = state
  const {
    isFetching,
    isResponseFailed,
    isResponseSuccess,
    isShowAlert,
    errorData,
    onSuccess,
    onAlertClose: customOnClose,
    alertTitle,
    errorMessage,
  } = apiResponse

  const isServerError = errorData?.status !== 200

  const onClose = useCallback(() => {
    customOnClose && customOnClose()

    dispatch({ type: apiTypes.RESET_STATUS })
  }, [dispatch, customOnClose])

  useEffect(() => {
    if (!isResponseSuccess) return

    const timer = setTimeout(() => {
      dispatch({ type: apiTypes.RESET_STATUS })

      onSuccess && onSuccess()

      clearTimeout(timer)
    }, 2000)
  }, [dispatch, isResponseSuccess, onSuccess])

  return (
    <>
      <AlertModal
        isOpened={!isFetching && isResponseFailed && isShowAlert}
        onClose={onClose}
        modalTitle={
          <>
            <Icon.Alert />
            <Typography.Text size='lg' marginLeft={8}>
              {alertTitle}
            </Typography.Text>
          </>
        }
        hasCancelButton={false}
        confirmButtonText='確定'
      >
        {!isServerError &&
          Object.values(errorData?.errors).map((error, index) => error.map((item, index) => <Typography.Text key={index}>{item}</Typography.Text>))}
        {isServerError && errorMessage}
      </AlertModal>
      <IconModal isOpened={!isFetching && isResponseSuccess && isShowAlert} icon={<Icon.Success />} description='成功' />
      <IconModal isOpened={isFetching && isShowAlert} icon={<Spinner size='sm' />} description='傳送中' />
    </>
  )
}

Response.propTypes = propTypes

export default Response
