import { useState } from 'react'
import { QuantitySelector } from './QuantitySelector'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function CartItem ({ item, addProductToCart, reduceProductFromCartById, setShow }) {
  const [outOfStockIds, setOutOfStockIds] = useState([])

  const handleAddProductToCart = (product) => {
    if (product.quantity + 1 >= product.stock) {
      if (!outOfStockIds.includes(product.id)) {
        setOutOfStockIds(prev => [...prev, product.id])
        setTimeout(() => {
          setOutOfStockIds(prev => prev.filter(id => id !== product.id))
        }, 2000)
      }
      if (product.quantity + 1 !== product.stock) {
        return
      }
    }
    addProductToCart(product)
  }

  return (
    <div className='position-relative'>
      <Link
        to={`/product/${item.id}`}
        className='position-absolute top-0 end-0 m-0 text-primary'
        style={{ zIndex: 10 }}
        onClick={() => setShow(false)}
      >
        <i className='bi bi-info-circle-fill fs-3' style={{ cursor: 'pointer' }} />
      </Link>

      <Container className='d-flex justify-content-center gap-2 pe-5'>
        <div className='d-flex flex-column justify-content-between align-items-center py-2'>
          <img
            src={item.images[0]}
            alt={item.title}
            style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
          />
        </div>

        <div className='d-flex flex-column' style={{ width: '200px' }}>
          <strong>{item.title}</strong>
          <div className='d-flex justify-content-between mt-1' style={{ fontSize: '18px' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          <QuantitySelector
            item={item}
            handleAddProductToCart={handleAddProductToCart}
            reduceProductFromCartById={reduceProductFromCartById}
            shouldDecreaseToZero
            isProductInCart
          />
        </div>
      </Container>

      {outOfStockIds.includes(item.id) && (
        <p className='text-danger mt-1 mb-1 text-center'>
          Lo siento, el stock máximo es de {item.stock} unidades
        </p>
      )}
    </div>
  )
}
