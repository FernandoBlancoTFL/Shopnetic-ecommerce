import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

export function QuantitySelector ({ item, handleAddProductToCart, removeProductFromCart, shouldDecreaseToZero = false }) {
  const decrease = () => {
    if (item.quantity > 1 || shouldDecreaseToZero) {
      removeProductFromCart(item.id)
    }
  }

  const increase = () => {
    if (item.quantity <= item.stock) {
      handleAddProductToCart(item)
    }
  }

  return (
    <div
      className='d-flex align-items-center border rounded p-0 my-2'
      style={{
        width: '124px',
        height: '42px',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        display: 'inline-flex'
      }}
    >
      <Button
        variant='light'
        onClick={decrease}
        disabled={shouldDecreaseToZero ? item.quantity === 0 : item.quantity === 1}
        className='border-0'
        style={{
          borderRadius: 0,
          width: '40px',
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

      <div className='px-3 fw-semibold fs-5 text-center' style={{ minWidth: '40px' }}>
        {item.quantity}
      </div>

      <div
        style={{
          width: '1px',
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
          width: '40px',
          height: '100%'
        }}
      >
        <Icon.Plus />
      </Button>
    </div>
  )
}
