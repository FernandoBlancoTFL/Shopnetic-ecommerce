import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { OrderContext } from '../context/OrderContext'
import { Link } from 'react-router-dom'

function OrderItem ({ order, onFinish, onCancel }) {
  const capitalizedStatus =
    order.status.charAt(0).toUpperCase() + order.status.slice(1)

  const statusColor = {
    pending: '#e67e22',
    completed: '#27ae60',
    cancelled: '#c0392b'
  }[order.status] || 'gray'

  return (
    <div
      className='order-item d-flex flex-wrap justify-content-center justify-content-md-between align-items-center p-3 mb-4 bg-white rounded shadow-sm'
      style={{ borderLeft: `6px solid ${statusColor}` }}
    >
      <div className='d-flex gap-3 flex-wrap justify-content-center justify-content-md-between'>
        <div
          className='order-summary flex-shrink-0 text-center'
          style={{ minWidth: '110px' }}
        >
          <strong style={{ fontSize: '1.1rem' }}>Orden #{order.id}</strong>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className='d-flex gap-3'>
          <div className='order-prices flex-grow-1 d-flex justify-content-around flex-wrap text-center gap-3'>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total</div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>
                ${order.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div
            className='order-status text-center flex-shrink-0'
            style={{ color: statusColor, fontWeight: '600', minWidth: '100px' }}
          >
            Estado
            <div>
              {capitalizedStatus}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center'>
        <div className='order-actions d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0 flex-shrink-0'>
          {order.status === 'pending' &&
            <Link
              to='/checkout'
              className='btn btn-success'
              onClick={() => onFinish(order)}
            >
              Finalizar compra
            </Link>}
          {order.status === 'pending' &&
            <button
              className='btn btn-danger'
              onClick={() => onCancel(order)}
            >
              Cancelar orden
            </button>}
          {order.status === 'completed' &&
            <button
              className='btn btn-primary'
              onClick={() => alert('función en desarrollo')}
            >
              Ver detalles
            </button>}
          {order.status === 'cancelled' &&
            <button
              className='btn btn-primary'
              onClick={() => alert('función en desarrollo')}
            >
              Ver detalles
            </button>}
        </div>
      </div>

    </div>
  )
}

export function UserOrders () {
  const { loadingOrder, getUserOrders, setUserCurrentOrder, modifyOrder } = useContext(OrderContext)
  const [orders, setOrders] = useState([])

  const fetchAndSortOrders = async () => {
    const fetchedOrders = await getUserOrders()
    const priority = { completed: 1, pending: 2, cancelled: 3 }
    const sortedOrders = [...fetchedOrders].sort((a, b) => {
      return priority[a.status] - priority[b.status]
    })
    setOrders(sortedOrders)
  }

  useEffect(() => {
    fetchAndSortOrders()
  }, [])

  const handleFinish = (order) => {
    setUserCurrentOrder(order)
  }

  const handleCancel = async (order) => {
    Swal.fire({
      title: '¿Estás seguro que quieres cancelar la orden de compra?',
      text: 'Cancelación de orden de compra',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Prefiero no cancelar',
      confirmButtonText: 'Cancelar orden de compra'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await modifyOrder(order.id, order.shipmentPrice, 'cancelled')
        fetchAndSortOrders()
      }
    })
  }

  if (loadingOrder) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation='border' />
      </div>
    )
  }

  return (
    <main className='main flex-grow-1 bg-secondary text-dark py-5'>
      <div className='container' style={{ maxWidth: 800 }}>
        {orders.length === 0
          ? <p className='fs-3 text-light text-center'>No hay órdenes para mostrar.</p>
          : orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onFinish={handleFinish}
              onCancel={handleCancel}
            />
          ))}
      </div>
    </main>
  )
}
