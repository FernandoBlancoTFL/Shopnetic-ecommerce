import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { OrderContext } from '../context/OrderContext'

export function CartItemCheckout () {
  const { order } = useContext(OrderContext)

  return (
    <Container className='d-flex flex-column justify-content-center my-4'>

      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      >
        {order.items.map(product => (
          <div key={product.productId}>
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
                  src={product.productImage}
                  alt={product.productTitle}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover'
                  }}
                />
              </Col>
              <Col xs={6} sm={6} className='p-0'>
                <div>
                  <strong className='m-0'>{product.productTitle}</strong>
                  <p className='m-0'>{product.category}</p>
                  <p className='m-0'><span className='fw-semibold'>Marca:</span> {product.brand}</p>
                  <p className='m-0'><span className='fw-semibold'>Cantidad:</span> {product.quantity}</p>
                  <p className='m-0'><span className='fw-semibold'>Peso:</span> {product.weight} g</p>
                  <p className='m-0'><span className='fw-semibold'>Ancho:</span> {product.width} cm</p>
                </div>
              </Col>
              <Col xs={2} sm={2} className='p-0 text-end align-self-start'>
                <p>$ {(product.price).toFixed(2)}</p>
              </Col>
            </Row>
            <hr className='border-white-50 mt-2 mb-2' />
          </div>
        ))}
      </div>

    </Container>

  )
}
