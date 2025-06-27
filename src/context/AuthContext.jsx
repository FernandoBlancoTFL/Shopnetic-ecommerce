import { createContext, useState, useEffect } from 'react'
import { ADMIN_USER, USERS_URL } from '../constants/constants'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const getUserByToken = async (tokenFromLocalStorage) => {
    const response = await fetch(USERS_URL)
    const data = await response.json()
    const userData = data.find(user => user.token === tokenFromLocalStorage)
    return userData
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      const tokenFromLocalStorage = window.localStorage.getItem('authToken')
      if (tokenFromLocalStorage === ADMIN_USER.token) {
        setUser(ADMIN_USER)
      } else if (tokenFromLocalStorage) {
        const userFromApi = await getUserByToken(tokenFromLocalStorage)
        setUser(userFromApi)
      }
    }

    loadUser()
  }, [])

  const login = (user) => {
    window.localStorage.setItem('authToken', user.token)
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
