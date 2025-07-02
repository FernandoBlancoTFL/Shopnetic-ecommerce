import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useContext } from 'react'

export function ProtectedRoute ({ children }) {
  const { user, loading } = useContext(AuthContext)
  const { shoppingCart } = useContext(ShoppingCartContext)
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (location.pathname === '/userAdmin' && user.userName !== 'admin') {
    return <Navigate to='/' />
  }

  if (location.pathname === '/checkout' && shoppingCart.length === 0) {
    return <Navigate to='/' />
  }

  return children
}

