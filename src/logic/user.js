class User {
  constructor (data) {
    Object.assign(this, data)
  }

  static login () {

  }

  static logout () {

  }
}

export default {
  login: User.login,
  logout: User.logout,
  loggedIn: () => true, //Boolean(User.user),
  currentUser: () => User.user
}
