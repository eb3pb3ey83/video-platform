import * as Yup from 'yup'
import loginUrl, { login } from '@/api/login'
import authConfig from '@/authConfig'

export default function formikConfig(props) {
  return {
    initialValues: {
      account: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      account: Yup.string().required('請輸入帳號'),
      password: Yup.string().required('請輸入密碼'),
    }),

    onSubmit: ({ account, password }, actions) => {
      login(loginUrl, { account, password })
        .then(response => authConfig.setAccessToken(response.token))
        .then(() => window.localStorage.setItem('userId', account))
        .then(() => window.location.reload())
        .catch(error => actions.setStatus({ message: error.message }))
        .finally(() => actions.setSubmitting(false))
    },
  }
}
