import { useContext } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function LoginButtonDisplay ({ user, isMobile }) {
  return (
    <Button
      as={Link} to={user ? '' : '/login'} variant='info'
      className={`${isMobile ? 'd-inline d-lg-none' : 'd-none d-lg-inline'} align-content-center`}
    >
      {user
        ? <i class='bi bi-person-circle' />
        : (<span className='d-flex align-items-center'>
          <i className='bi bi-person-circle me-2' />
          Iniciar sesión
           </span>)}
    </Button>
  )
}

function UserDropdownButton ({ logout, isMobile = false }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='primary' id='dropdown-basic' className={`${isMobile ? 'd-inline d-lg-none' : 'd-none d-lg-inline'}`}>
        <i class='bi bi-person-circle' />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/userProfile'>Perfil</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export function LoginButton ({ isMobile = false }) {
  const { user, logout } = useContext(AuthContext)

  return (
    user
      ? <UserDropdownButton logout={logout} isMobile={isMobile} />
      : <LoginButtonDisplay user={user} isMobile={isMobile} />
  )
}
