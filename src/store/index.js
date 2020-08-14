const USERKEY = 'heimauser'
export function saveUserInfo (userInfo) {
  window.localStorage.setItem(USERKEY, JSON.stringify(userInfo))
}
export function getUserInfo () {
  const userStr = window.localStorage.getItem(USERKEY)
  return JSON.parse(userStr)
}
export function clearUserInfo () {
  window.localStorage.removeItem(USERKEY)
}
