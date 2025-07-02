import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function UserProfile () {
  const { user } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const formattedDate = new Date(user.accountCreationDate).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <Seo
        title={`Perfil de ${user.firstName} | Shopnetic`}
        description={`Información del usuario ${user.firstName} ${user.lastname}`}
        keywords='usuario, perfil, cuenta, configuración, shopnetic'
        url='https://shopneticfb.netlify.app/userProfile'
      />
      <div className='d-flex p-5 bg-secondary justify-items-center'>

        <div className='main container bg-secondary'>
          <div className='col-lg-8 col-md-10 mx-auto bg-secondary'>
            <div className='text-end my-2'>
              <Link to='/'><Button variant='primary' className='px-4 py-2 fw-semibold shadow-sm rounded-2' style={{ minWidth: '120px' }}><i className='bi bi-arrow-left' /> Volver</Button></Link>
            </div>
            <div className='card shadow-lg'>
              <div className='card-body text-center p-4'>
                <img
                  src={user.image}
                  alt='Foto de perfil de admin'
                  className='rounded-circle mb-3'
                  width='150'
                  height='150'
                />
                <h2 className='card-title'>{user.firstName} {user.lastname}</h2>
                <h5 className='text-muted mb-2'>@{user.userName}</h5>
                <p className='text-muted'>Usuario</p>

                <p className='mt-3'>{user.description}</p>

                <hr />

                <div className='row mt-4 text-center'>
                  <div className='col-sm-6 mb-3'>
                    <h6 className='mb-0 text-muted'>Correo electrónico:</h6>
                    <span>{user.email}</span>
                  </div>
                  <div className='col-sm-6 mb-3'>
                    <h6 className='mb-0 text-muted'>País:</h6>
                    <span>{user.country}</span>
                  </div>
                  <div className='col-sm-6 mb-3'>
                    <h6 className='mb-0 text-muted'>Fecha de ingreso:</h6>
                    <span>{formattedDate}</span>
                  </div>
                  <div className='col-sm-6 mb-3'>
                    <h6 className='mb-0 text-muted'>Contraseña:</h6>
                    <div className='d-flex justify-content-center align-items-center'>
                      <span className='mx-5 me-2'>
                        {showPassword ? user.password : '•'.repeat(user.password.length)}
                      </span>
                      <i
                        className={`mx-3 bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                        onClick={togglePasswordVisibility}
                        style={{
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          color: '#6c757d'
                        }}
                        title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      />
                    </div>
                  </div>
                </div>

                <button className='btn btn-primary mt-3 px-4'>Editar perfil</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
