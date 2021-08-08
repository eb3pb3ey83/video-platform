import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactTable from 'react-table'

// Components
import Spinner from '../Spinner'
import Overlay from '../Overlay'
import Title from './components/Title'
import EmptyData from '@/basicComponents/EmptyData'

// Lib MISC

// Style
import './style.scss'

// Variables / Functions

export const propTypes = {
  ...ReactTable.propTypes,
  noDataText: PropTypes.string,
  isEmpty: PropTypes.bool,
  noDataIcon: PropTypes.node,
}

export const defaultProps = {
  ...ReactTable.defaultProps,
  noDataText: '目前無資料',
}

function Table(props) {
  const { className, noDataText, isEmpty, data, noDataIcon, ...restProps } = props

  return (
    <ReactTable
      {...restProps}
      data={data}
      className={classnames('table', { empty: isEmpty }, '-highlight', className)}
      manual
      resizable={false}
      sortable={false}
      multiSort={false}
      showPagination={false}
      NoDataComponent={() => <EmptyData noDataText={noDataText} icon={noDataIcon} />}
      LoadingComponent={({ loading }) => (
        <Overlay isShowed={loading} shouldCreatePortal={false} style={{ zIndex: 1 }}>
          <Spinner />
        </Overlay>
      )}
    />
  )
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

Table.Title = Title

export default Table
