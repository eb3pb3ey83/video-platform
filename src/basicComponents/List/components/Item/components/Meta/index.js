import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '@/basicComponents/Typography'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.node,
  titleProps: PropTypes.object,
  description: PropTypes.node,
  role: PropTypes.object,
  descriptionProps: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

function Meta(props) {
  const { title, titleProps = {}, description, descriptionProps = {}, role, className, children, ...restProps } = props

  return (
    <div className={cx('list-item-meta', className)} {...restProps}>
      {title && (
        <Typography.Title level='h5' lineHeight={1} shouldEllipsis {...titleProps}>
          {title}
        </Typography.Title>
      )}
      {description && (
        <Typography.Text color='gray-dark' size='xs' lineHeight={1} marginTop={6} shouldEllipsis {...descriptionProps}>
          {description}
        </Typography.Text>
      )}
      {role && (
        <Typography.Text color='warn' size='xs' lineHeight={1} marginTop={6} shouldEllipsis {...descriptionProps}>
          {role?.name}
        </Typography.Text>
      )}
    </div>
  )
}

Meta.propTypes = propTypes

export default Meta
