import { useRef } from 'react'
import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'
import { Row, Col, Container } from 'react-bootstrap'
import { FilterMenu } from '../components/FilterMenu'
import { HomeCarousel } from '../components/HomeCarousel'

export function Home ({ filterURL, filterName, handleFilter }) {
  const productsRef = useRef(null)

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className='main flex-grow-1 d-flex flex-column align-items-center bg-secondary text-white'>
      <HomeCarousel onImageClick={scrollToProducts} />

      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} lg={3} className='mb-3 mt-4' ref={productsRef}>
            <FilterMenu onApplyFilters={handleFilter} />
          </Col>
          <Col
            xs={11}
            sm={10}
            md={10}
            lg={10}
            xl={8}
            className='p-2 mt-3 mb-3 d-flex flex-column justify-content-center'
          >
            <h2 className='mb-4'>{filterName}</h2>
            <ShoppingCart isPositionFixed />
            <Products filterURL={filterURL} />
          </Col>
        </Row>
      </Container>
    </main>
  )
}
