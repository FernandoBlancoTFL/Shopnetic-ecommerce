import { createContext, useState, useContext } from 'react'
import { ORDER_URL, ORDER_ITEM_URL } from '../constants/constants'
import { AuthContext } from './AuthContext'
import { getUserAccessTokenFromLocalStorage } from '../utils/getUserAccessTokenFromLocalStorage'

export const OrderContext = createContext()

export function OrderProvider ({ children }) {
  const { user } = useContext(AuthContext)
  const tokenFromLocalStorage = getUserAccessTokenFromLocalStorage()
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [order, setOrder] = useState([])

  const getUserOrders = async () => {
    const response = await fetch(ORDER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenFromLocalStorage}`
      }
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const userOrders = await response.json()
    setLoadingOrder(false)
    return userOrders
  }

  const setUserCurrentOrder = (order) => {
    setOrder(order)
    setLoadingOrder(false)
  }

  const createUserOrderByUserId = async () => {
    const response = await fetch(`${ORDER_ITEM_URL}/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenFromLocalStorage}`
      }
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const orderResponse = await response.json()
    setOrder(orderResponse)
    setLoadingOrder(false)
  }

  const modifyOrder = async (orderId, shipmentPrice = 0, status = null) => {
    const response = await fetch(`${ORDER_URL}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenFromLocalStorage}`
      },
      body: JSON.stringify({
        OrderId: orderId,
        Status: status,
        ShipmentPrice: shipmentPrice
      })
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const orderResponse = await response.json()
    setOrder(orderResponse)
    setLoadingOrder(false)
  }

  return (
    <OrderContext.Provider value={{
      order,
      loadingOrder,
      createUserOrderByUserId,
      modifyOrder,
      getUserOrders,
      setUserCurrentOrder
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}
