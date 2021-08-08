const { localStorage } = window

const auth = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',

  setAccessToken(accessToken) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken)
  },

  removeAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN)
  },

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN)
  },

  logOut() {
    this.removeAccessToken()
    window.localStorage.clear()
    window.location.reload()
  },

  isAuthenticated() {
    const accessToken = this.getAccessToken()

    return typeof accessToken === 'string' && accessToken.length > 0
  },
}

export default auth
