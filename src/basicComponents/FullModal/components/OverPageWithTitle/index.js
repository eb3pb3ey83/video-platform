import React from 'react'
import PropTypes from 'prop-types'

// Components
import Layout from '@/basicComponents/Layout'
import HeaderTitle from '@/basicComponents/HeaderTitle'
import { withOverPage } from '@/basicComponents/OverPage'

// Lib MISC

// Variables / Functions

export const defaultProps = {
  isScrollable: true,
}

export const propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.node,
  isScrollable: PropTypes.bool,
}

function OverPageWithTitle(props) {
  const { children, headerTitle, isScrollable } = props

  return (
    <Layout height='100%'>
      <Layout.Header>
        <HeaderTitle align='center'>{headerTitle}</HeaderTitle>
      </Layout.Header>

      <Layout.Content isScrollable={isScrollable}>{children}</Layout.Content>
    </Layout>
  )
}

OverPageWithTitle.defaultProps = defaultProps
OverPageWithTitle.propTypes = propTypes

export default withOverPage(OverPageWithTitle)
