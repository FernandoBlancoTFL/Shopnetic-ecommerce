import { createContext, useState, useEffect } from 'react'
import { AUTH_URL } from '../constants/constants'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUserByToken = async (tokenFromLocalStorage) => {
    const response = await fetch(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`
      }
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const user = await response.json()
    return user
  }

  useEffect(() => {
    const loadUser = async () => {
      const tokenFromLocalStorage = window.localStorage.getItem('accessToken')

      if (tokenFromLocalStorage == null) {
        setLoading(false)
        return
      }

      const userFromApi = await getUserByToken(tokenFromLocalStorage)
      setUser(userFromApi)
      setLoading(false)
    }

    loadUser()
  }, [])

  const login = (userResponse) => {
    window.localStorage.setItem('accessToken', userResponse.accessToken)
    window.localStorage.setItem('refreshToken', userResponse.refreshToken)
    setUser(userResponse.user)
  }

  const logout = () => {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
