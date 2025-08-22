import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { OrderContext } from '../context/OrderContext'
import { useContext, useEffect, useState } from 'react'

export function ProtectedRoute ({ children }) {
  const { user, loading } = useContext(AuthContext)
  const { order, loadingOrder } = useContext(OrderContext)
  const [redirect, setRedirect] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let timer
    if (location.pathname === '/checkout') {
      timer = setTimeout(() => {
        setRedirect(true)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [location.pathname, loadingOrder])

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (location.pathname === '/userAdmin' && user.userName !== 'admin') {
    return <Navigate to='/' />
  }

  if (loading || (location.pathname === '/checkout' && loadingOrder)) {
    return null
  }

  if (
    location.pathname === '/checkout' &&
    redirect &&
    (!order.items || order.items.length === 0)
  ) {
    return <Navigate to='/' />
  }

  return children
}
