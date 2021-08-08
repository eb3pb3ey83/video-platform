import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components / Views
import Form from '@/views/Auth/views/Login/components/Form'

const cx = classnames.bind(styles)

function Login(props) {
  return (
    <div className={cx('login')}>
      <div className={cx('login__form')}>
        <Form />
      </div>
    </div>
  )
}

export default Login
