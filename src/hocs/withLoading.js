import React from 'react'
import PropTypes from 'prop-types'

import Overlay from '@/basicComponents/Overlay'
import Spinner from '@/basicComponents/Spinner'

function DefaultLoadingComponent() {
  return (
    <Overlay isShowed shouldCreatePortal={false} style={{ zIndex: 10, overflow: 'initial' }}>
      <Spinner />
    </Overlay>
  )
}

function withLoading(Component) {
  const WrappedComponent = ({ isFetching, isLoaded, loadingComponent: LoadingComponent, render, ...props }) => {
    if (isFetching || !isLoaded) {
      return typeof LoadingComponent !== 'undefined' ? <LoadingComponent /> : <DefaultLoadingComponent />
    } else {
      return typeof render === 'function' ? <Component {...props}>{render(props)}</Component> : <Component {...props} />
    }
  }

  WrappedComponent.propTypes = {
    isFetching: PropTypes.bool,
    isLoaded: PropTypes.bool.isRequired,
    loadingComponent: PropTypes.elementType,
    render: PropTypes.func,
  }

  return WrappedComponent
}

export default withLoading
