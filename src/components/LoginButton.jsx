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

function UserDropdownButton ({ user, logout, isMobile = false }) {
  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estas seguro que quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      customClass: {
        popup: 'my-swal-popup',
        backdrop: 'my-swal-backdrop'
      },
      willOpen: () => {
        const swalEl = document.querySelector('.swal2-popup')
        const backdropEl = document.querySelector('.swal2-backdrop')
        if (swalEl) swalEl.style.setProperty('z-index', '9999', 'important')
        if (backdropEl) backdropEl.style.setProperty('z-index', '9998', 'important')
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    })
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant='primary' id='dropdown-basic' className={`${isMobile ? 'd-inline d-lg-none' : 'd-none d-lg-inline'}`} style={{ height: '45px' }}>
        {user} <i class='bi bi-person-circle' />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/userProfile'>Perfil</Dropdown.Item>
        <Dropdown.Item as={Link} to='/userAdmin'>Administrar usuarios</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export function LoginButton ({ isMobile = false }) {
  const { user, logout } = useContext(AuthContext)

  return (
    user
      ? <UserDropdownButton user={user} logout={logout} isMobile={isMobile} />
      : <LoginButtonDisplay user={user} isMobile={isMobile} />
  )
}
