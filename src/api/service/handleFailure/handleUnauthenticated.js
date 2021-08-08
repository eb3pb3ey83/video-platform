import authConfig from '@/authConfig'

export default function handleUnauthenticated(reason) {
  const { status } = reason

  if (status === 401) {
    authConfig.removeAccessToken()
  }
}
