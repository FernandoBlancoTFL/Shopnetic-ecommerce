import { useContext, useState } from 'react'
import { Button, Form, Container, Card, Alert, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ADMIN_USER, USERS_URL } from '../constants/constants'

export function Login () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const getUserByUserName = async () => {
    const response = await fetch(USERS_URL)
    const data = await response.json()
    const userData = data.find(userFromList => userFromList.userName === user)
    return userData
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await getUserByUserName()
    if (user === 'admin' && password === '1234') {
      setShowAlert(false)
      login(ADMIN_USER)
      navigate('/')
    } else if (userData && userData.password === password) {
      setShowAlert(false)
      login(userData)
      navigate('/')
    } else {
      setShowAlert(true)
    }
  }

  return (
    <main className='d-flex align-items-center justify-content-center bg-secondary flex-grow-1 min-vh-100 px-3'>
      <Container className='my-5'>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Card className='shadow-lg p-4 pb-1'>
              <Card.Body>
                <h2 className='mb-4 text-center'>Iniciar Sesión</h2>
                {showAlert && (
                  <Alert variant='danger'>Datos incorrectos.</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='user'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Ingresa tu usuario'
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-4' controlId='formPassword'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Ingresa tu contraseña'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='w-100'>
                    Ingresar
                  </Button>
                  <div className='d-flex flex-column mt-3'>
                    <p className='text-black m-0'>Cuenta administrador:</p>
                    <p className='text-black m-0'>Usuario: admin - Contraseña: 1234</p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
