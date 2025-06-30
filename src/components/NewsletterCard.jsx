import { useState } from 'react'
import {
  Container,
  Form,
  Row,
  Button
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function NewsletterCard () {
  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim()) {
      toast.error('El email es obligatorio.')
    } else if (!emailRegex.test(email)) {
      toast.error('Ingrese un email válido.')
    } else {
      toast.success('¡Gracias por suscribirte!')
      setEmail('')
    }
  }

  return (
    <div className='nl-banner w-100 position-relative overflow-hidden' style={{ maxWidth: '900px' }}>
      <img
        src='/img/newsletterBanner.png'
        alt='Fondo Newsletter'
        className='position-absolute top-0 start-0 w-100 h-100'
        style={{
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.8
        }}
      />
      <Container
        fluid
        className='position-relative text-black text-center px-4 py-5'
        style={{ zIndex: 1, maxWidth: '900px' }}
      >
        <div>
          <h2 className='fw-bold mb-3'>
            Manténgase informado sobre contenido exclusivo
          </h2>
          <p className='mb-4'>
            Suscríbase a nuestro newsletter para ser el primero en recibir ofertas exclusivas.
            Descubra qué está en tendencia y cuáles son las mejores ofertas para ti.
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className='justify-content-center g-2'>
            <div
              className={`d-flex rounded-pill p-1 bg-white w-100 align-items-center ${
                isFocused ? 'shadow border border-primary' : ''
              }`}
            >
              <Form.Control
                type='email'
                placeholder='Ingrese su email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='rounded-pill bg-white border-0 text-dark shadow-none'
                maxLength={60}
                required
              />
              <Button
                variant='dark'
                type='submit'
                className='rounded-pill px-4 ms-2'
              >
                Suscribir
              </Button>
            </div>
          </Row>
        </Form>
      </Container>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='colored'
      />
    </div>
  )
}
