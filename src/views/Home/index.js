import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import Layout from '@/basicComponents/Layout'
import Response from '@/basicComponents/Response'
import Brand from './components/Brand'
import Navigation from './components/Navigation'
import HeaderTitle from './components/HeaderTitle'
import HeaderAction from './components/HeaderAction'
import { withEmpty } from '@/basicComponents/Empty'
import withLoading from '@/hocs/withLoading'
import View from '@/basicComponents/View'
import Account from './components/Account'
import UploadPopover from './components/UploadPopover'

// Lib MISC// Lib MISC
import findStaticPath from '@/utils/find-static-path'
import navigations from './eventHandler/navigations'
import { useUserInfoValues } from './eventHandler/computedValues/useUserInfoValues'
import { useUserApplicationRecordData } from './eventHandler/computedValues/useUserApplicationRecordData'
import { useIsCollapsedMethod } from './eventHandler/methods/useIsCollapsedMethod'
import { useRequest } from './eventHandler/shareMethods/useRequest'
import { useOrganizationnId } from './eventHandler/shareMethods/useOrganizationnId'
import { useShouldRender } from './eventHandler/shareMethods/useShouldRender'
import { useNotification } from './eventHandler/methods/useNotification'
import { useUserFunction } from './eventHandler/computedValues/useUserFunction'

// Variables / Functions
const cx = classnames.bind(styles)
const ViewWithLoadingAndEmpty = withEmpty(withLoading(View))
const AccountWithLoading = withLoading(Account)

export const propTypes = {
  history: PropTypes.object,
}

function Home(props) {
  const { history } = props
  const { isCollapsed, handleOnCollapse } = useIsCollapsedMethod()
  const { isUserInfoFetched } = useUserInfoValues()
  const { hasApplicationRecordData } = useUserApplicationRecordData(isUserInfoFetched)
  const routesForRender = useShouldRender(navigations)
  const navigationWithNotification = useNotification(routesForRender, hasApplicationRecordData)
  const currentNavigation = navigationWithNotification.find(route => new RegExp(findStaticPath(route.path)).test(location.pathname)) || []

  useUserFunction()
  useRequest()
  useOrganizationnId()

  return (
    <Layout className={cx('home')} height='100vh'>
      <UploadPopover history={history} />
      <Response />
      <Layout.Sider isCollapsed={isCollapsed} className={cx('home__web-sider')} onCollapse={handleOnCollapse}>
        <Brand withText={!isCollapsed} withPadding onClick={() => history.push('/')} />
        <Navigation withText={!isCollapsed} navigations={routesForRender} {...props} />
      </Layout.Sider>

      <Layout.Content>
        <Layout height='100%'>
          <Layout.Header isFlexbox align='space-between' className={cx('home__header')}>
            <HeaderTitle>{(currentNavigation || { name: null }).name}</HeaderTitle>

            <HeaderAction>
              <AccountWithLoading className={cx('home__account-header')} isLoaded={isUserInfoFetched} isFetching={!isUserInfoFetched} />
            </HeaderAction>
          </Layout.Header>

          <Layout.Content className={cx('home__content')} isFlexbox align='center' isScrollable>
            <ViewWithLoadingAndEmpty
              isLoaded={isUserInfoFetched}
              isFetching={!isUserInfoFetched}
              source={routesForRender}
              navigations={routesForRender}
              {...props}
            />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

Home.propTypes = propTypes

export default Home
