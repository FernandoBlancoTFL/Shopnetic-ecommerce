import { useState } from 'react'
import { Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

export function QuantitySelector () {
  const [quantity, setQuantity] = useState(1)

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increase = () => {
    setQuantity(quantity + 1)
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
        disabled={quantity === 1}
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

      <div className='px-3 fw-bold fs-5 text-center' style={{ minWidth: '40px' }}>
        {quantity}
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
