import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Menu from '@/basicComponents/Menu'
import Badge from '@/basicComponents/Badge'
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'

// Lib MISC
import findStaticPath from '@/utils/find-static-path'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  match: PropTypes.object,
  withText: PropTypes.bool,
  navigations: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      name: PropTypes.string,
      icon: PropTypes.shape({
        mode: PropTypes.string,
        name: PropTypes.string,
      }),
      count: PropTypes.number,
    }),
  ).isRequired,
}
function Navigation(props) {
  const { match, withText, navigations } = props

  return (
    <nav className={cx('home-navigation')}>
      <Menu>
        {navigations.map(({ path, name, icon, features, hasNotification, isActive }, index) => {
          if (name === null || icon === null) return null

          const pathname = `${match.url}/${findStaticPath(path)}`
          const isDotOnly = !withText && hasNotification

          return (
            <Menu.Item key={index} height={54}>
              <Menu.Link to={pathname} style={{ paddingLeft: 24, paddingRight: withText ? 12 : 24 }}>
                <Badge isDotOnly={isDotOnly} type='warn' status='processing' style={{ display: 'flex', flexBasis: '100%' }}>
                  {icon}
                  <CSSTransition in={withText} timeout={300} classNames={getClassNames(cx, 'home-navigation-content')}>
                    <div
                      className={cx('home-navigation-content')}
                      style={{ ...props, flex: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Menu.Content>{name}</Menu.Content>
                      <Badge type='warn' shouldShowZero={false} />
                    </div>
                  </CSSTransition>
                </Badge>
              </Menu.Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </nav>
  )
}

Navigation.propTypes = propTypes

export default Navigation
