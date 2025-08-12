export function getUserAccessTokenFromLocalStorage () {
  const tokenFromLocalStorage = window.localStorage.getItem('accessToken')
  return tokenFromLocalStorage
}
