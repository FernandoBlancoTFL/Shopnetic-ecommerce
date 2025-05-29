import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export function ProtectedRoute ({ children }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to='/login' />
  }

  return children
}
