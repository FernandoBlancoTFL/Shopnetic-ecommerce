import { Container, Card, Row, Col } from 'react-bootstrap'
import { CheckoutForm } from '../components/CheckoutForm'
import { CartItemCheckout } from '../components/CartItemCheckout'
import { useContext, useState } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'

export function Checkout () {
  const { shoppingCart, totalPrice } = useContext(ShoppingCartContext)
  const [shippingPrice, setShippingPrice] = useState(0)
  const tax = 25.35
  const totalPriceCheckout = totalPrice + shippingPrice + tax

  return (
    <main className='main flex-grow-1 bg-secondary text-white'>
      <Container className='py-2 py-sm-2 py-md-2 py-lg-2 bg-secondary'>
        <Card className='shadow' style={{ backgroundColor: '#f2f2f2', paddingRight: '12px' }}>
          <Row className='align-items-start justify-content-between'>
            <Col md={8} className='text-center mb-4 mb-md-0 p-2 p-lg-4 px-4 px-lg-5'>
              <div className='d-flex align-items-center justify-content-between'>
                <h3 className='text-start m-0'>Checkout</h3>
                <p className='m-0 mt-2 fw-semibold'>{`Subtotal ${(shoppingCart.length > 1 ? `(${shoppingCart.length} Items)` : '(1 Item)')}: $${totalPrice}`}</p>
              </div>
              <hr className='border-white-50' />
              <div className='d-flex justify-content-center w-100' style={{ minHeight: '400px' }}>
                <CheckoutForm shippingPrice={shippingPrice} setShippingPrice={price => setShippingPrice(price)} />
              </div>
            </Col>
            <Col md={4} className='p-4 ms-2 ms-lg-0 bg-white rounded-end-1'>
              <h4>Resumen de compra</h4>
              <div className='d-flex flex-column my-4 mx-auto' style={{ maxWidth: '350px' }}>
                <div className='d-flex justify-content-between'>
                  <p>Subtotal:</p>
                  <p>$ {totalPrice}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Envio:</p>
                  <p>$ {shippingPrice.toFixed(2)}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Impuesto:</p>
                  <p>$ {tax}</p>
                </div>
                <hr className='border-white-50' />
                <div className='d-flex justify-content-between'>
                  <p>Total:</p>
                  <p>$ {totalPriceCheckout}</p>
                </div>
                <hr className='border-white-50' />
              </div>
              <h4><i class='bi bi-cart3' /> Carrito {shoppingCart
                ? (shoppingCart.length > 1 ? `(${shoppingCart.length} Items)` : '(1 Item)')
                : '(0 Items)'}
              </h4>
              <CartItemCheckout />
            </Col>
            <div className='d-flex pe-0 pe-lg-5 w-50' />

          </Row>
        </Card>
      </Container>
    </main>
  )
}
