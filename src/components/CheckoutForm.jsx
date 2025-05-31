import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function AddressForm ({ setShowComponent }) {
  return (
    <Container className='border border-1' style={{ maxWidth: '600px' }}>
      <h4 className='mb-4 text-start'>Dirección del envío</h4>
      <Form>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formFirstName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type='text' placeholder='Ingresa tu nombre' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='formLastName'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type='text' placeholder='Ingresa tu apellido' />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group controlId='formAddress1'>
              <Form.Label>Dirección</Form.Label>
              <Form.Control type='text' placeholder='Calle y número' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='formAddress2'>
              <Form.Label>Dirección 2</Form.Label>
              <Form.Control type='text' placeholder='Piso, depto, etc. (opcional)' />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col md={6}>
            <Form.Group controlId='formPostalCode'>
              <Form.Label>Código postal</Form.Label>
              <Form.Control type='text' placeholder='Ej: 1000' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='formCity'>
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type='text' placeholder='Ej: Buenos Aires' />
            </Form.Group>
          </Col>
        </Row>

        <Button variant='primary' onClick={() => setShowComponent(2)}>
          Continuar con el método de entrega
        </Button>
      </Form>
    </Container>
  )
};

function ShippingMethod ({ setShowComponent, setShippingPrice }) {
  const [selected, setSelected] = useState('standard')

  useEffect(() => {
    switch (selected) {
      case 'standard':
        setShippingPrice(0)
        break
      case 'premium':
        setShippingPrice(10.00)
        break
      case 'express':
        setShippingPrice(15.00)
        break
    }
  }, [selected])

  const options = [
    {
      id: 'standard',
      title: 'Standard',
      description: 'De 3 a 6 días hábiles',
      price: 'Gratis'
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'De 2 a 3 días hábiles',
      price: '$10.00'
    },
    {
      id: 'express',
      title: 'Express',
      description: 'De 1 a 2 días hábiles',
      price: '$15.00'
    }
  ]

  return (
    <Form className='mt-4 border border-1'>
      <h4 className='mb-3 text-start'>Método de envío</h4>
      <div className='d-flex justify-content-center mt-5 mb-3'>
        <div className='shipping-methods-wrapper'>
          {options.map((option) => (
            <div
              key={option.id}
              className={`shipping-card ${selected === option.id ? 'selected' : ''}`}
              onClick={() => setSelected(option.id)}
            >
              <Row className='align-items-center gap-3'>
                <Col xs={1}>
                  <span className='custom-radio'>
                    {selected === option.id && <span className='radio-dot' />}
                  </span>
                </Col>
                <Col>
                  <Row>
                    <Col xs={8}>
                      <div className='fw-bold'>{option.title}</div>
                      <div className='text-muted'>{option.description}</div>
                    </Col>
                    <Col xs={4} className='text-end fw-semibold'>
                      {option.price}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
      <Button variant='primary' onClick={() => setShowComponent(3)}>
        Continuar con el método de pago
      </Button>
    </Form>
  )
};

function PaymentForm () {
  return (
    <Container className='border border-1' style={{ maxWidth: '400px' }}>
      <h4 className='mb-4 text-start'>Pago</h4>
      <Form>
        <Row className='mb-3'>
          <Col md={100}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Ingresa tu email' />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={100}>
            <Form.Group controlId='formCard'>
              <Form.Label>Información de la tarjeta</Form.Label>
              <Form.Control type='text' placeholder='1234 1234 1234 1234' />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId='formCardExp'>
                  <Form.Control type='text' placeholder='MM / AA' />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='formCardCvc'>
                  <Form.Control type='text' placeholder='CVC' />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col md={100}>
            <Form.Group controlId='formCardName'>
              <Form.Label>Nombre como figura en la tarjeta</Form.Label>
              <Form.Control type='text' placeholder='Juan C Lopez' />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col md={100}>
            <Form.Group controlId='formCity'>
              <Form.Label>Pais</Form.Label>
              <Form.Control type='text' placeholder='Argentina' />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='primary'>
          Confirmar compra
        </Button>
      </Form>
    </Container>
  )
};

export function CheckoutForm ({ setShippingPrice }) {
  const [showComponent, setShowComponent] = useState(1)

  const components = {
    1: <AddressForm setShowComponent={setShowComponent} />,
    2: <ShippingMethod setShowComponent={setShowComponent} setShippingPrice={setShippingPrice} />,
    3: <PaymentForm />
  }

  return components[showComponent] || null
}
