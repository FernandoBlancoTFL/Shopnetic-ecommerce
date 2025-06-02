import { useContext } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { Container, Row, Col } from 'react-bootstrap'

export function CartItemCheckout () {
  const { shoppingCart } = useContext(ShoppingCartContext)

  return (
    <Container className='d-flex flex-column justify-content-center my-4'>
      {shoppingCart.map(product => (
        <div key={product.id}>
          <Row
            className='d-flex justify-content-between align-items-center flex-nowrap'
            style={{ flexWrap: 'nowrap' }}
          >
            <Col
              xs={4}
              sm={3}
              className='p-0 d-flex justify-content-center align-self-start'
            >
              <img
                src={product.images[0]}
                alt={product.title}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  marginRight: '0'
                }}
              />
            </Col>
            <Col
              xs={6}
              sm={6}
              className='p-0'
            >
              <div>
                <strong className='m-0'>{product.title}</strong>
                <p className='m-0'>{product.category}</p>
                <p className='m-0'>
                  <span className='m-0 fw-semibold'>Marca:</span> {product.brand}
                </p>
                <p className='m-0'>
                  <span className='m-0 fw-semibold'>Cantidad:</span> {product.quantity}
                </p>
                <p className='m-0'>
                  <span className='m-0 fw-semibold'>Peso:</span> {product.weight} g
                </p>
                <p className='m-0'>
                  <span className='m-0 fw-semibold'>Ancho:</span> {product.dimensions.width} cm
                </p>
              </div>
            </Col>
            <Col
              xs={2}
              sm={2}
              className='p-0 text-end align-self-start'
            >
              <p>$ {(product.price).toFixed(2)}</p>
            </Col>
          </Row>
          <hr className='border-white-50 mt-2 mb-2' />
        </div>
      ))}
    </Container>

  )
}
