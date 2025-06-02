import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(() => {
    const tokenFromLocalStorage = window.localStorage.getItem('shoppingCart')
    return tokenFromLocalStorage ? 'admin' : null
  })

  const login = (username) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    window.localStorage.setItem('authToken', token)
    setUser(username)
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
