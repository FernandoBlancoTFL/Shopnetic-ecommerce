import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { OrderContext } from '../context/OrderContext'
import { useContext, useEffect, useState } from 'react'

export function ProtectedRoute ({ children }) {
  const { user, loading } = useContext(AuthContext)
  const { order, loadingOrder, getUserOrders } = useContext(OrderContext)
  const [redirect, setRedirect] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (loading || loadingOrder) {
    return null
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (location.pathname === '/userAdmin' && user.userName !== 'admin') {
    return <Navigate to='/' />
  }

  if (location.pathname === '/checkout' && (!order.items || order.items.length === 0)) {
    return <Navigate to='/' />
  }

  return children
}
