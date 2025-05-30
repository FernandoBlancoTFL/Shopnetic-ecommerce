import { Container, Card, Row, Col, Button } from 'react-bootstrap'

export function Checkout () {
  return (
    <main className='main flex-grow-1 bg-secondary text-white'>
      <Container className='py-2 py-sm-2 py-md-2 py-lg-2 bg-secondary'>
        <Card className='shadow p-4'>
          <Row className='align-items-start'>
            <Col md={6} className='text-center mb-4 mb-md-0'>
              <h2>Checkout</h2>
              <Container className=''>
                <h3>Dirección</h3>
                <span>Nombre</span>
                <input type='text' />
                <span>Apellido</span>
                <input type='text' />
                <span>Dirección</span>
                <input type='text' />
                <span>Dirección 2</span>
                <input type='text' />
                <span>Código postal</span>
                <input type='text' />
                <span>Ciudad</span>
                <input type='text' />
                <Button>Continuar con el método de entrega</Button>
              </Container>
            </Col>
            <Col md={6}>
              <h2>Resumen de compra</h2>
              <p>Subtotal: $ 0.00</p>
              <p>Envio: $ 0.00</p>
              <p>Impuesto: $ 0.00</p>
              <p>Total: $ 0.00</p>
              <h3>Carrito (0 ítems)</h3>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  )
}
