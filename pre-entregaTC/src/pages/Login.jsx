import { useState } from 'react'
import { Button, Form, Container, Card, Alert } from 'react-bootstrap'

export function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      setShowAlert(false)
      window.location.reload()
    } else {
      setShowAlert(true)
    }
  }

  return (
    <main className='d-flex align-items-center justify-content-center bg-secondary flex-grow-1'>
      <Container className='mt-5 mb-5 w-25'>
        <Card className='shadow-lg p-4'>
          <Card.Body>
            <h2 className='mb-4 text-center'>Iniciar Sesión</h2>
            {showAlert && (
              <Alert variant='danger'>Por favor, completa ambos campos.</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Ingresa tu email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
