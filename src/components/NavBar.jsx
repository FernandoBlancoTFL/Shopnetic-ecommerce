import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function NavBar ({ handleFilter }) {
  return (
    <Navbar expand='lg' className='bg-dark py-3 shadow' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src='https://cdn-icons-png.freepik.com/512/869/869636.png?ga=GA1.1.1678774421.1729989836https://www.freepik.es/iconos/tienda'
            alt='Shopnetic Logo'
            width='50'
            height='50'
            className='d-inline-block align-middle'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products', 'Nuestros Productos')}>Inicio</Nav.Link>
            <Nav.Link as={Link} to='/about'>Sobre Nosotros</Nav.Link>
            <NavDropdown title='Productos' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products', 'Belleza')}>Belleza</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products/category/smartphones', 'Celulares')}>Celulares</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products/category/home-decoration', 'Decoración para la casa')}>Decoración para la casa</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products/category/sports-accessories', 'Deportes')}>Deportes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleFilter('https://dummyjson.com/products/category/vehicle', 'Vehículos')}>Vehículos</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className='d-flex align-items-center'>
            <Form className='d-flex me-3'>
              <Form.Control
                type='search'
                placeholder='Celulares, Remeras...'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success'>Buscar</Button>
            </Form>

            <Button as={Link} to='/login' variant='info'>
              Administración
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
