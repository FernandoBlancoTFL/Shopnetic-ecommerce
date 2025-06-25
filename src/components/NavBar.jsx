import { useRef } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { ShoppingCart } from './ShoppingCart'
import { LoginButton } from './LoginButton'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'

export function NavBar ({ handleFilter }) {
  const searchRef = useRef()

  const handleSearch = (query) => {
    if (!query.trim()) {
      handleFilter('https://dummyjson.com/products', 'Nuestros Productos')
    } else {
      handleFilter(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`, `Resultados para "${query}"`)
    }
  }

  const handleCategoryClick = (url, name) => {
    handleFilter(url, name)
    if (searchRef.current) {
      searchRef.current.clear() // limpia el input
    }
  }

  return (
    <Navbar expand='lg' className='bg-dark py-3 shadow custom-navbar' variant='dark'>
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand as={Link} to='/' className='m-0 mx-lg-2 d-flex flex-grow-1 flex-lg-grow-0'>
          <img
            src='https://cdn-icons-png.freepik.com/512/869/869636.png?ga=GA1.1.1678774421.1729989836https://www.freepik.es/iconos/tienda'
            alt='Shopnetic Logo'
            width='50'
            height='50'
            className='d-inline-block align-middle'
          />
        </Navbar.Brand>
        <LoginButton isMobile />
        <ShoppingCart isPositionFixed={false} />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products', 'Nuestros Productos')}>Inicio</Nav.Link>
            <Nav.Link as={Link} to='/contact'>Contacto</Nav.Link>
            <Nav.Link as={Link} to='/about'>Sobre Nosotros</Nav.Link>
            <NavDropdown title='Productos' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products', 'Belleza')}>Belleza</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products/category/smartphones', 'Celulares')}>Celulares</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products/category/home-decoration', 'Decoración para la casa')}>Decoración para la casa</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products/category/sports-accessories', 'Deportes')}>Deportes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/' onClick={() => handleCategoryClick('https://dummyjson.com/products/category/vehicle', 'Vehículos')}>Vehículos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className='d-flex align-items-center justify-content-center my-1 search-input'>
            <SearchBar onSearch={handleSearch} />
          </div>
        </Navbar.Collapse>
        <LoginButton isMobile={false} />
      </Container>
    </Navbar>
  )
}
