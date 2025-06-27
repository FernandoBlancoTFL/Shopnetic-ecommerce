import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useContext } from 'react'

export function ProtectedRoute ({ children }) {
  const { user } = useContext(AuthContext)
  const { shoppingCart } = useContext(ShoppingCartContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to='/login' />
  }

  if (location.pathname === '/checkout' && shoppingCart.length === 0) {
    return <Navigate to='/' />
  }

  return children
}
