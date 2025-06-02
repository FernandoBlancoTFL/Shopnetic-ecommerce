import { useEffect, useState, useRef, useContext } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useNavigate } from 'react-router-dom'

export const validateForm = (form) => {
  if (form.checkValidity()) {
    return true
  }
  form.reportValidity()
  return false
}

function AddressForm ({ userInfo, setShowComponent, setUserInfo }) {
  const formRef = useRef(null)

  const [addressFormData, setFormData] = useState({
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    address1: userInfo.address1 || '',
    address2: userInfo.address2 || '',
    postalCode: userInfo.postalCode || '',
    city: userInfo.city || ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = formRef.current

    if (validateForm(form)) {
      setUserInfo((prev) => ({
        ...prev,
        ...addressFormData
      }))
      setShowComponent(2)
    }
  }

  return (
    <Container className='border border-1 p-3 bg-white' style={{ maxWidth: '600px' }}>
      <h4 className='mb-3 text-start'>Dirección del envío</h4>
      <p className='text-start text-muted'>* Indica campos obligatorios</p>
      <Form ref={formRef} className='my-4' noValidate>
        <Row className='mb-3 text-start'>
          <Col md={6}>
            <Form.Group controlId='firstName'>
              <Form.Label className='mb-0'>NOMBRE *</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Ingresa tu nombre'
                required
                maxLength={20}
                value={addressFormData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='lastName'>
              <Form.Label className='mb-0'>APELLIDO *</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Ingresa tu apellido'
                required
                maxLength={20}
                value={addressFormData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3 text-start'>
          <Col md={6}>
            <Form.Group controlId='address1'>
              <Form.Label className='mb-0'>DIRECCIÓN *</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Calle y número'
                required
                maxLength={30}
                value={addressFormData.address1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='address2'>
              <Form.Label className='mb-0'>DIRECCIÓN 2</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Piso, depto, etc.'
                maxLength={30}
                value={addressFormData.address2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-4 text-start'>
          <Col md={6}>
            <Form.Group controlId='postalCode'>
              <Form.Label className='mb-0'>CÓDIGO POSTAL *</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Ej: 1000'
                required
                maxLength={4}
                pattern='^[0-9]{4}$'
                value={addressFormData.postalCode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='city'>
              <Form.Label className='mb-0'>CIUDAD *</Form.Label>
              <Form.Control
                className='rounded-0'
                type='text'
                placeholder='Ej: Buenos Aires'
                required
                maxLength={20}
                value={addressFormData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className='d-flex justify-content-center mt-5'>
          <Button variant='primary' onClick={handleSubmit}>
            Siguiente
          </Button>
        </div>
      </Form>
    </Container>
  )
}

function ShippingMethod({ userInfo, setUserInfo, setShowComponent, setShippingPrice, shippingPrice }) {
  const [selected, setSelected] = useState(userInfo?.shippingMethod || 'Standard');  // Valor predeterminado "Standard"
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    if (validateForm(form)) {
      setUserInfo((prev) => ({
        ...prev,
        shippingMethod: selected,
        shippingPrice,
      }));
      setShowComponent(3);
    }
  };

  useEffect(() => {
    switch (selected) {
      case 'Standard':
        setShippingPrice(0);
        break;
      case 'Premium':
        setShippingPrice(10.00);
        break;
      case 'Express':
        setShippingPrice(15.00);
        break;
    }
  }, [selected, setShippingPrice]);

  const options = [
    {
      id: 'Standard',
      title: 'Standard',
      description: 'De 3 a 6 días hábiles',
      price: 'Gratis',
    },
    {
      id: 'Premium',
      title: 'Premium',
      description: 'De 2 a 3 días hábiles',
      price: '$10.00',
    },
    {
      id: 'Express',
      title: 'Express',
      description: 'De 1 a 2 días hábiles',
      price: '$15.00',
    },
  ];

  return (
    <Container className='p-3 border border-1 bg-white' style={{ maxWidth: '600px' }}>
      <Form ref={formRef} noValidate>
        <h4 className='mb-3 text-start'>Método de envío</h4>
        <p className='text-start text-muted'>Selecciona el método de envío</p>
        <div className='d-flex justify-content-center mt-4 mb-3'>
          <div className='shipping-methods-wrapper mb-3'>
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
                        <div className='fw-bold text-start'>{option.title}</div>
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
        <div className='d-flex gap-2 justify-content-center'>
          <Button variant='secondary' onClick={() => setShowComponent(1)}>
            Volver
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Siguiente
          </Button>
        </div>
      </Form>
    </Container>
  );
}

function PaymentForm ({ userInfo, setShowComponent, setUserInfo }) {
  const formRef = useRef(null)

  const [payFormData, setFormDataPay] = useState({
    formEmail: userInfo.formEmail || '',
    formCard: userInfo.formCard || '',
    formCardExp: userInfo.formCardExp || '',
    formCardCvc: userInfo.formCardCvc || '',
    formCardName: userInfo.formCardName || '',
    formCountry: userInfo.formCountry || ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormDataPay(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current

    if (validateForm(form)) {
      setUserInfo(prev => ({
        ...prev,
        ...payFormData
      }))
      setShowComponent(4)
    }
  }

  const handleCardChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
    e.target.value = formattedValue
    handleChange(e)
  }

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
    }
    e.target.value = value
    handleChange(e)
  }

  return (
    <Container className='border border-1 p-3 bg-white' style={{ maxWidth: '600px' }}>
      <h4 className='mb-4 text-start'>Pago</h4>
      <Container style={{ maxWidth: '450px' }}>
        <Form ref={formRef} noValidate>
          <Row className='mb-3 text-start'>
            <Col md={100}>
              <Form.Group controlId='formEmail'>
                <Form.Label className='mb-0'>EMAIL</Form.Label>
                <Form.Control className='rounded-0' type='email' placeholder='Ingresa tu email' value={payFormData.formEmail} maxLength={60} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3 text-start justify-content-center'>
            <Col md={100}>
              <Form.Group controlId='formCard'>
                <Form.Label className='mb-0'>INFORMACIÓN DE LA TARJETA</Form.Label>
                <Form.Control
                  className='rounded-0'
                  type='text'
                  placeholder='1234 1234 1234 1234'
                  maxLength={19}
                  onChange={handleCardChange}
                  required
                  value={payFormData.formCard}
                />
              </Form.Group>
            </Col>
            <Row className='mb-0 text-start'>
              <Col md={6} className='p-0'>
                <Form.Group controlId='formCardExp'>
                  <Form.Control
                    className='rounded-0'
                    type='text'
                    placeholder='MM / AA'
                    maxLength={5}
                    onChange={handleExpirationChange}
                    required
                    value={payFormData.formCardExp}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className='p-0'>
                <Form.Group controlId='formCardCvc'>
                  <Form.Control className='rounded-0' type='text' placeholder='CVC' value={payFormData.formCardCvc} maxLength={3} pattern='^[0-9]{3}$' onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Row className='mb-4 text-start'>
            <Col md={100}>
              <Form.Group controlId='formCardName'>
                <Form.Label className='mb-0'>NOMBRE COMO FIGURA EN LA TARJETA</Form.Label>
                <Form.Control className='rounded-0' type='text' placeholder='Juan C Lopez' value={payFormData.formCardName} maxLength={50} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-4 text-start'>
            <Col md={100}>
              <Form.Group controlId='formCountry'>
                <Form.Label className='mb-0'>PAIS</Form.Label>
                <Form.Control className='rounded-0' as='select' onChange={handleChange} value={payFormData.formCountry} required>
                  <option value=''>Selecciona un país</option>
                  <option value='Argentina'>Argentina</option>
                  <option value='Brasil'>Brasil</option>
                  <option value='Chile'>Chile</option>
                  <option value='México'>México</option>
                  <option value='Colombia'>Colombia</option>
                  <option value='Perú'>Perú</option>
                  <option value='España'>España</option>
                  <option value='EEUU'>EE.UU.</option>
                  <option value='Uruguay'>Uruguay</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div className='d-flex gap-2 justify-content-center'>
            <Button variant='secondary' onClick={() => setShowComponent(2)}>
              Volver
            </Button>
            <Button variant='primary' onClick={handleSubmit}>
              Siguiente
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  )
}

function ReviewAndOrder ({ userInfo, setShowComponent }) {
  const { emptyShoppingCart } = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const handleSubmit = () => {
    Swal.fire({
      title: 'Compra finalizada!',
      text: 'Te enviaremos por mail los detalles de la compra',
      icon: 'success'
    }).then(() => {
      emptyShoppingCart()
      navigate('/')
    })
  }

  return (
    <Container className='border border-1 p-3 bg-white' style={{ maxWidth: '600px' }}>
      <h4 className='mb-3 text-start'>Revisar y realizar pedido</h4>
      <Container className='d-flex flex-column text-start gap-4'>
        <Container>
          <Container>
            <div className='d-flex justify-content-between'>
              <h5>1. Dirección</h5>
              <a
                onClick={() => setShowComponent(1)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Cambiar
              </a>
            </div>
            <div className='d-flex flex-column px-3'>
              <span>{userInfo.firstName} {userInfo.lastName}</span>
              <span>{userInfo.address1}</span>
              {userInfo.address2 !== '' ? <span>{userInfo.address2}</span> : null}
              <span>Código postal: {userInfo.postalCode}</span>
              <span>{userInfo.formCountry}, {userInfo.city}</span>
            </div>
            <hr className='border-white-50 my-2' />
          </Container>
          <Container>
            <div className='d-flex justify-content-between'>
              <h5>2. Método de envío</h5>
              <a
                onClick={() => setShowComponent(2)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Cambiar
              </a>
            </div>
            <div className='d-flex flex-column px-3'>
              <span>{userInfo.shippingMethod} - ${userInfo.shippingPrice}</span>
            </div>
            <hr className='border-white-50' />
          </Container>
          <Container>
            <div className='d-flex justify-content-between'>
              <h5>3. Datos del pago</h5>
              <a
                onClick={() => setShowComponent(3)}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Cambiar
              </a>
            </div>
            <div className='d-flex gap-5 px-3'>
              <div className='d-flex flex-column'>
                <p className='m-0 fw-semibold'>Información de la tarjeta</p>
                <span>{userInfo.formCardName}</span>
                <span>**** **** **** {userInfo.formCard.slice(14, 19)}</span>
                <span>Vence: {userInfo.formCardExp}</span>
              </div>
              <div className='d-flex flex-column'>
                <p className='m-0 fw-semibold'>Dirección de envío</p>
                <span>{userInfo.firstName} {userInfo.lastName}</span>
                <span>{userInfo.address1}</span>
                {userInfo.address2 !== '' ? <span>{userInfo.address2}</span> : null}
                <span>{userInfo.formCountry}, {userInfo.city}</span>
              </div>
            </div>
          </Container>
        </Container>
        <div className='d-flex gap-2 m-2 justify-content-center'>
          <Button variant='secondary' onClick={() => setShowComponent(3)}>
            Volver
          </Button>
          <Button variant='success' onClick={handleSubmit}>
            Realizar pedido
          </Button>
        </div>
      </Container>
    </Container>
  )
}

export function CheckoutForm({ shippingPrice, setShippingPrice }) {
  const [showComponent, setShowComponent] = useState(1)
  const [userInfo, setUserInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [showComponent])

  const components = {
    1: <AddressForm userInfo={userInfo} setShowComponent={setShowComponent} setUserInfo={setUserInfo} />,
    2: <ShippingMethod userInfo={userInfo} setUserInfo={setUserInfo} setShowComponent={setShowComponent} setShippingPrice={setShippingPrice} shippingPrice={shippingPrice} />,
    3: <PaymentForm userInfo={userInfo} setShowComponent={setShowComponent} setUserInfo={setUserInfo} />,
    4: <ReviewAndOrder userInfo={userInfo} setShowComponent={setShowComponent} />
  }

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation='border' />
      </div>
    )
  }

  return components[showComponent] || null
}
