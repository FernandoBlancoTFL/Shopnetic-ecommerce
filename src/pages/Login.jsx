import { useContext, useState, useEffect } from 'react'
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AUTH_URL } from '../constants/constants'
import { Seo } from '../components/Seo'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const userData = {
    email,
    password
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        toast.error('Datos incorrectos', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'colored'
        })
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }

      const result = await response.json()
      login(result)
      navigate('/')
    } catch (error) {
      console.error('Petition error:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='main d-flex align-items-center justify-content-center bg-secondary flex-grow-1 px-3'>
      <Seo
        title='Login | Shopnetic'
        description='Inicia sesión en tu cuenta de Shopnetic.'
        keywords='login, iniciar sesión, shopnetic'
        url='https://shopneticfb.netlify.app/login'
      />
      <Container className='my-2'>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <div className='text-end my-2'>
              <Link to='/'><Button variant='primary' className='px-4 py-2 fw-semibold shadow-sm rounded-2' style={{ minWidth: '120px' }}><i className='bi bi-arrow-left' /> Volver</Button></Link>
            </div>
            <Card className='shadow-lg p-4 pb-1 login-background' style={{ height: '630px' }}>
              <Card.Body>
                <p className='text-white '>Bienvenido de vuelta!</p>
                <h2 className='mb-4 text-center text-white'>Iniciar Sesión</h2>
                <ToastContainer style={{ marginTop: '90px' }} />
                <Form onSubmit={handleSubmit}>
                  <div className='custom-input mb-4'>
                    <i className='bi bi-person' />
                    <input
                      className='no-border-input w-75'
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className='custom-input mb-4 d-flex align-items-center'>
                    <i className='bi bi-lock' />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Contraseña'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='w-75'
                    />
                    <button
                      type='button'
                      className='btn btn-eye'
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                    </button>
                  </div>

                  <Button
                    variant='primary'
                    type='submit'
                    className='w-100 rounded-pill d-flex align-items-center justify-content-center'
                    disabled={isLoading}
                  >
                    {isLoading
                      ? <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                      : 'Ingresar'}
                  </Button>

                  <div className='mt-3 text-center'>
                    <Link to='/register' className='login-link'>
                      ¿Todavía no estás registrado? Registrate aqui
                    </Link>
                  </div>
                  <div className='mt-2 text-center'>
                    <Link onClick={() => alert('Funcionalidad en desarrollo')} className='login-link'>
                      ¿Olvidaste la contraseña?
                    </Link>
                  </div>

                  <div className='d-flex flex-column mt-3'>
                    <p className='m-0 fw-semibold text-white'>Cuenta administrador:</p>
                    <p className='m-0 text-white'>Email: admin@example.com</p>
                    <p className='m-0 text-white'>Contraseña: 1234</p>
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
