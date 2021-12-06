class User {
  constructor (data) {
    Object.assign(this, data)
  }

  static login () {

  }

  static logout () {

  }
}

const auth = {
  login: User.login,
  logout: User.logout,
  loggedIn: () => true, //Boolean(User.user),
  getCurrentUser: () => User.user
}

export default auth
