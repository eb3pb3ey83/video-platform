export default function debug(reason, apiInfo) {
  const { url } = apiInfo.config
  const { message } = reason

  console.warn(`${url} \n - status: ${reason?.status ?? reason.returnCode} \n - message: ${message}\n\n`, reason)
}
