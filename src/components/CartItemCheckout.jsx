import { useContext } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { Container, Row, Col } from 'react-bootstrap'

export function CartItemCheckout () {
  const { shoppingCart } = useContext(ShoppingCartContext)

  return (
    <Container className='d-flex flex-column justify-content-center my-4'>
      {shoppingCart.map(product =>
        <Row key={product.id} className='d-flex justify-content-between'>
          <Col md={3} className='p-0'>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '0' }}
            />
          </Col>
          <Col md={6} className='p-0'>
            <div>
              <strong className='m-0'>{product.title}</strong>
              <p className='m-0'>{product.category}</p>
              <p className='m-0'><span className='m-0 fw-semibold'>Marca:</span> {product.brand}</p>
              <p className='m-0'><span className='m-0 fw-semibold'>Cantidad:</span> {product.quantity}</p>
              <p className='m-0'><span className='m-0 fw-semibold'>Peso:</span> {product.weight} g</p>
              <p className='m-0'><span className='m-0 fw-semibold'>Ancho:</span> {product.dimensions.width} cm</p>
            </div>
          </Col>
          <Col md={2} className='p-0'>
            <p>$ {(product.price).toFixed(2)}</p>
          </Col>
          <hr className='border-white-50 mt-2 mb-2' />
        </Row>
      )}
    </Container>
  )
}
