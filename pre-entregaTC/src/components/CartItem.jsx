import { QuantitySelector } from './QuantitySelector'
import { Container } from 'react-bootstrap'

export function CartItem ({ item, index, handleAddProductToCart, removeProductFromCart, outOfStockIds }) {
  return (
    <div>
      <Container className='d-flex justify-content-center gap-2'>
        <img
          src={item.images[0]}
          alt={item.title}
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
        />
        <div className='d-flex flex-column' style={{ width: '200px' }}>
          <strong>{item.title}</strong>
          <div className='d-flex justify-content-between mt-1' style={{ fontSize: '18px' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          <QuantitySelector item={item} handleAddProductToCart={handleAddProductToCart} removeProductFromCart={removeProductFromCart} shouldDecreaseToZero />
        </div>
      </Container>
      {outOfStockIds.includes(item.id) && (
        <p className='text-danger mt-1 mb-1 text-center'>Lo siento, el stock máximo es de {item.stock} unidades</p>
      )}
    </div>

  )
}
