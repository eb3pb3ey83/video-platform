import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import { useHistory, useLocation } from 'react-router-dom'

// Components
import TabItem from './components/TabItem'

// Style

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.any.isRequired,
  routePath: PropTypes.string,
}

export const defaultProps = {}

const Tab = React.forwardRef((props, ref) => {
  const { children, routePath, ...restProps } = props

  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const currentReportTab = pathname.split(`${routePath}`)[1] // 目前無法透過 params 拿到所以只好從 location 拿

  const onTabItemClick = event => {
    const selectedItem = event.currentTarget.dataset.tab

    history.push(`${routePath}${selectedItem}`)
  }

  const TabChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      onTabItemClick,
      currentReportTab,
    })
  })

  return (
    <div className={cx('tab')} {...restProps}>
      {TabChildren}
    </div>
  )
})

Tab.propTypes = propTypes
Tab.defaultProps = defaultProps

Tab.Item = TabItem

export default Tab
