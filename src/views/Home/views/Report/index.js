import React from 'react'
import { hot } from 'react-hot-loader/root'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
// import PropTypes from 'prop-types'

// Components
import Tab from '@/basicComponents/Tab'
import View from '@/basicComponents/View'

// Lib MISC
import { useShouldRender } from '@/views/Home/eventHandler/shareMethods/useShouldRender'
import navigations from './eventHandler/navigations'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

const ROUTE_PATH = '/home/report/'
const DEFAULT_TAB = 'upload'

function Report(props) {
  const routesForRender = useShouldRender(navigations)

  return (
    <>
      <div className={cx('report')}>
        <Tab routePath={ROUTE_PATH}>
          {routesForRender.map((route, index) => {
            return <Tab.Item key={index} title={route.name} path={route.path}></Tab.Item>
          })}
        </Tab>
        <View to={`${ROUTE_PATH}${DEFAULT_TAB}`} navigations={routesForRender} {...props} />
      </div>
    </>
  )
}

Report.propTypes = propTypes

export default hot(Report)
