import { useState, useEffect } from 'react'
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AUTH_URL } from '../constants/constants'
import { Seo } from '../components/Seo'
import { ToastContainer, toast } from 'react-toastify'
import { getUserProfileUrlImage } from '../utils/getUserProfileUrlImage'
import 'react-toastify/dist/ReactToastify.css'

export function Register () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    country: 'Argentina',
    role: 'cliente',
    image: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'El nombre es obligatorio'
    if (!formData.lastName.trim()) return 'El apellido es obligatorio'
    if (!formData.userName.trim()) return 'El nombre de usuario es obligatorio'
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Email inválido'
    if (formData.password.length < 4) return 'La contraseña debe tener al menos 4 caracteres'
    if (formData.password !== formData.confirmPassword) return 'Las contraseñas no coinciden'
    if (!formData.country.trim()) return 'El país es obligatorio'
    if (!formData.description.trim()) return 'La descripción es obligatoria'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'colored'
      })
      return
    }

    setIsLoading(true)

    const userImageUrl = await getUserProfileUrlImage()

    try {
      const { confirmPassword, ...userData } = formData
      userData.image = userImageUrl
      const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        toast.error(errorMessage || 'Error al registrarse', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          theme: 'colored'
        })
        throw new Error(errorMessage)
      }

      toast.success('Registro exitoso, ahora puedes iniciar sesión', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'colored'
      })

      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      console.error('Error en la petición:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='main d-flex align-items-center justify-content-center bg-secondary flex-grow-1 px-3'>
      <Seo
        title='Registro | Shopnetic'
        description='Crea una cuenta en Shopnetic.'
        keywords='registro, crear cuenta, shopnetic'
        url='https://shopneticfb.netlify.app/register'
      />
      <Container className='my-2'>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <div className='text-end my-2'>
              <Link to='/login'><Button variant='primary' className='px-4 py-2 fw-semibold shadow-sm rounded-2' style={{ minWidth: '120px' }}><i className='bi bi-arrow-left' /> Volver</Button></Link>
            </div>
            <Card className='shadow-lg p-4 pb-1 login-background'>
              <Card.Body>
                <p className='text-white'>¡Únete a nuestra tienda!</p>
                <h2 className='mb-4 text-center text-white'>Registro</h2>
                <ToastContainer style={{ marginTop: '90px' }} />
                <Form onSubmit={handleSubmit}>
                  {[
                    { icon: 'bi-person', type: 'text', name: 'firstName', placeholder: 'Nombre' },
                    { icon: 'bi-person', type: 'text', name: 'lastName', placeholder: 'Apellido' },
                    { icon: 'bi-person-badge', type: 'text', name: 'userName', placeholder: 'Nombre de usuario' },
                    { icon: 'bi-envelope', type: 'email', name: 'email', placeholder: 'Email' },
                    { icon: 'bi-lock', type: showPassword ? 'text' : 'password', name: 'password', placeholder: 'Contraseña', passwordToggle: true },
                    { icon: 'bi-lock-fill', type: showPassword ? 'text' : 'password', name: 'confirmPassword', placeholder: 'Confirmar contraseña', passwordToggle: true }
                  ].map((field, idx) => (
                    <div key={idx} className={`custom-input mb-4 ${field.passwordToggle ? 'd-flex align-items-center' : ''}`}>
                      <i className={`bi ${field.icon}`} />
                      <input
                        className='no-border-input w-75'
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                      />
                      {field.passwordToggle && (
                        <button
                          type='button'
                          className='btn btn-eye'
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                        </button>
                      )}
                    </div>
                  ))}

                  <div className='custom-input p-0 mb-3 border border-1' style={{ borderRadius: '6px' }}>
                    <i className='bi bi-geo-alt ms-1' />
                    <select
                      className='no-border-input country-select w-100'
                      name='country'
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value=''>Selecciona un país</option>
                      <option value='Argentina'>Argentina</option>
                      <option value='Brasil'>Brasil</option>
                      <option value='Chile'>Chile</option>
                      <option value='México'>México</option>
                      <option value='Colombia'>Colombia</option>
                      <option value='Perú'>Perú</option>
                      <option value='España'>España</option>
                      <option value='EE.UU'>EE.UU</option>
                      <option value='Uruguay'>Uruguay</option>
                    </select>
                  </div>

                  <div className='d-flex flex-column custom-input mb-4 border-0'>
                    <div className='d-flex justify-content-start align-content-center w-100'>
                      <i className='bi bi-card-text me-1 mb-1' />
                      <p className='text-light m-0 mt-1'>Descripción</p>
                    </div>
                    <textarea
                      className='no-border-input w-100 rounded rounded-2 bg-black text-white p-2 border border-1'
                      name='description'
                      placeholder='Escribe una descripción sobre ti'
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    variant='primary'
                    type='submit'
                    className='w-100 rounded-pill d-flex align-items-center justify-content-center'
                    disabled={isLoading}
                  >
                    {isLoading
                      ? <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                      : 'Registrarse'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
