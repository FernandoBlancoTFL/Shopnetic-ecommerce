import { useRef } from 'react'
import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'
import { Row, Col, Container } from 'react-bootstrap'
import { FilterMenu } from '../components/FilterMenu'
import { HomeCarousel } from '../components/HomeCarousel'
import { ImageCollection } from '../components/ImageCollection'
import { SearchBar } from '../components/SearchBar'

export function Home ({ filterURL, filterName, handleFilter }) {
  const productsRef = useRef(null)
  const searchRef = useRef()

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearch = (query) => {
    if (!query.trim()) {
      handleFilter('https://dummyjson.com/products', 'Nuestros Productos')
    } else {
      handleFilter(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`, `Resultados para "${query}"`)
    }
  }

  const handleFiltersAndClearSearch = (filterURL, filterName) => {
    handleFilter(filterURL, filterName)
    if (searchRef.current) {
      searchRef.current.clear()
    }
  }

  return (
    <main className='main flex-grow-1 d-flex flex-column align-items-center bg-secondary text-white'>
      <HomeCarousel onImageClick={scrollToProducts} />
      <ImageCollection handleFilter={handleFilter} scrollToProducts={scrollToProducts} />
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} lg={3} className='mb-3 mt-4' ref={productsRef}>
            <FilterMenu onApplyFilters={handleFiltersAndClearSearch} />
          </Col>
          <Col
            xs={11}
            sm={10}
            md={10}
            lg={10}
            xl={8}
            className='p-2 mt-3 mb-3 d-flex flex-column justify-content-center'
          >
            <div className='d-flex justify-content-end mb-3'>
              <SearchBar ref={searchRef} onSearch={handleSearch} />
            </div>
            <h2 className='mb-4'>{filterName}</h2>
            <ShoppingCart isPositionFixed />
            <Products filterURL={filterURL} scrollToProducts={scrollToProducts} />
          </Col>
        </Row>
      </Container>
    </main>
  )
}
