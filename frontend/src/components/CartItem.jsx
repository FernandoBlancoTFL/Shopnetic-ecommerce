import { useState } from 'react'
import { QuantitySelector } from './QuantitySelector'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function CartItem ({ item, addProductToCart, handleProductQuantity, setShow }) {
  const [outOfStockIds, setOutOfStockIds] = useState([])
  const [productQuantity, setProductQuantity] = useState(1)

  const handleAddProductToCart = async (product, quantity = 1) => {
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
    addProductToCart(product.productId, quantity)
  }

  const insertProductQuantity = (quantity) => {
    setProductQuantity(quantity)
  }

  return (
    <div className='position-relative'>
      <Link
        to={`/product/${item.productId}`}
        className='position-absolute top-0 end-0 m-0 text-primary'
        style={{ zIndex: 10 }}
        onClick={() => setShow(false)}
      >
        <i className='bi bi-info-circle-fill fs-3' style={{ cursor: 'pointer' }} />
      </Link>

      <Button
        className='position-absolute end-0 mt-5 text-primary bg-transparent p-0 border-0'
        style={{ top: '5px', zIndex: 10 }}
        onClick={() => handleProductQuantity(item.productId, 0)}
      >
        <i className='bi bi-trash fs-3 text-danger' style={{ cursor: 'pointer' }} />
      </Button>

      <Container className='d-flex justify-content-center gap-2 pe-5'>
        <div className='d-flex flex-column justify-content-between align-items-center py-2'>
          <img
            src={item.productImage}
            alt={item.productTitle}
            style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
          />
        </div>

        <div className='d-flex flex-column' style={{ width: '200px' }}>
          <strong>{item.productTitle}</strong>
          <div className='d-flex justify-content-between mt-1' style={{ fontSize: '18px' }}>
            ${item.discountedTotal}
          </div>
          <QuantitySelector
            item={item}
            handleAddProductToCart={handleAddProductToCart}
            handleProductQuantity={handleProductQuantity}
            shouldDecreaseToZero
            isProductInCart
            insertProductQuantity={insertProductQuantity}
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
