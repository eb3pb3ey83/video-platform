import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components / views
import Login from './views/Login'
import Icon from '@/basicComponents/Icon'

const cx = classnames.bind(styles)

function Auth(props) {
  return (
    <div className={cx('auth')}>
      <section className={cx('auth-section')}>
        <Icon.LoginBackground className={cx('auth-section__icon')} width={700} />
      </section>
      <aside className={cx('auth-aside')}>
        <Login />
      </aside>
    </div>
  )
}

export default Auth
