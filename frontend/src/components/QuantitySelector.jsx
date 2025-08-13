import { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { ShoppingCartContext } from '../context/ShoppingCartContext'

export function QuantitySelector ({ item, handleAddProductToCart, handleProductQuantity, insertProductQuantity, shouldDecreaseToZero = false, isProductInCart = false }) {
  const { shoppingCartProducts } = useContext(ShoppingCartContext)
  const [productQuantity, setProductQuantity] = useState(item)

  useEffect(() => {
    if (!shoppingCartProducts.some(p => p.productId === item.id)) {
      setProductQuantity(1)
      insertProductQuantity(1)
    }
  }, [shoppingCartProducts, item.id])

  const decrease = () => {
    if (!isProductInCart) {
      setProductQuantity(productQuantity - 1)
      const newQuantity = productQuantity
      insertProductQuantity(newQuantity - 1)
    } else {
      if (item.quantity > 1 || shouldDecreaseToZero) {
        handleProductQuantity(item.productId, (item.quantity - 1))
      }
    }
  }

  const increase = () => {
    if (!isProductInCart) {
      if (productQuantity + 1 > item.stock) return
      setProductQuantity(productQuantity + 1)
      const newQuantity = productQuantity
      insertProductQuantity(newQuantity + 1)
    } else {
      if (item.quantity + 1 <= item.stock) {
        handleAddProductToCart(item, (item.quantity + 1))
      }
    }
  }

  return (
    <div
      className='d-flex align-items-center justify-content-center border rounded p-0 my-2'
      style={{
        width: '150px',
        height: '42px',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        display: 'inline-flex'
      }}
    >
      <Button
        variant='light'
        onClick={decrease}
        disabled={
          isProductInCart
            ? shouldDecreaseToZero ? item.quantity === 0 : true
            : shouldDecreaseToZero ? productQuantity === 0 : productQuantity === 1
        }
        className='border-0'
        style={{
          borderRadius: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <Icon.Dash />
      </Button>

      <div
        style={{
          width: '1px',
          height: '80%',
          backgroundColor: '#dee2e6'
        }}
      />

      <div className='px-3 fw-semibold fs-5 text-center' style={{ minWidth: '60px' }}>
        {isProductInCart ? item.quantity : productQuantity}
      </div>

      <div
        style={{
          width: '2px',
          height: '80%',
          backgroundColor: '#dee2e6'
        }}
      />

      <Button
        variant='light'
        onClick={increase}
        className='border-0'
        style={{
          borderRadius: 0,
          width: '100%',
          height: '100%'
        }}
        disabled={
          isProductInCart
            ? !shouldDecreaseToZero
            : false
        }
      >
        <Icon.Plus />
      </Button>
    </div>
  )
}
