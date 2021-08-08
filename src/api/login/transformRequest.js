export default ({ account, password }) => {
  return {
    account: account.trim(),
    password: password.trim(),
  }
}
