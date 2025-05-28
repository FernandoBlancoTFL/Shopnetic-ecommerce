import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'
import { Row, Col, Container } from 'react-bootstrap'
import { CustomBreadcrumb } from './CustomBreadcrumb'
import { House } from 'react-bootstrap-icons'

export function Home ({ filterURL, filterName }) {
  return (
    <main className='main flex-grow-1 bg-secondary text-white '>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={11} sm={10} md={10} lg={10} xl={8} className='p-2 mt-3 mb-3 d-flex flex-column justify-content-center'>
            <h2 className='mb-4'>{filterName}</h2>
            <ShoppingCart isPositionFixed />
            <CustomBreadcrumb routes={[{ name: 'Inicio', path: '/', icon: <House size={16} /> }]} />
            <Products filterURL={filterURL} />
          </Col>
        </Row>
      </Container>
    </main>
  )
}
