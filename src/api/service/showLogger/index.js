export default function showLogger(action, response) {
  const responseStyle = 'font-weight: bold; color: #B5B5B5;'

  console.groupCollapsed(`api status: ${action}`)

  console.log('%c response', responseStyle, response)

  console.groupEnd()
}
