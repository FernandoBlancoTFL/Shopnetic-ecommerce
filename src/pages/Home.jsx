import { useRef, useState, useEffect } from 'react'
import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { HomeCarousel } from '../components/HomeCarousel'
import { ImageCollection } from '../components/ImageCollection'
import { SearchBar } from '../components/SearchBar'
import { NewsletterCard } from '../components/NewsletterCard'
import { FilterMenuAccordion } from '../components/FilterMenuAccordion'
import { Seo } from '../components/Seo'

export function Home ({ filterURL, filterName, handleFilter }) {
  const productsRef = useRef(null)
  const searchRef = useRef()
  const titleRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeKey, setActiveKey] = useState('0')
  const [wasFilterManuallyApplied, setWasFilterManuallyApplied] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    setMenuOpen(false)
    handleFilter(filterURL, filterName)

    if (wasFilterManuallyApplied) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setWasFilterManuallyApplied(false)
    }

    if (searchRef.current) {
      searchRef.current.clear()
    }
  }

  const handleSelect = (eventKey) => {
    if (activeKey === '0' && eventKey !== '0') {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveKey(eventKey)
  }

  return (
    <main className='main flex-grow-1 d-flex flex-column align-items-center bg-secondary text-white'>
      <Seo
        title={`Shopnetic - ${filterName}`}
        description='Explorá nuestros productos destacados en tecnología, hogar y más.'
        keywords='shopnetic, productos, tecnología, hogar, ofertas'
        url='https://shopneticfb.netlify.app/'
      />
      <HomeCarousel onImageClick={scrollToProducts} />
      <ImageCollection handleFilter={handleFilter} scrollToProducts={scrollToProducts} />
      <Container>
        <Row className='justify-content-center'>
          <Col
            xs={11}
            sm={10}
            md={10}
            lg={10}
            xl={8}
            className='p-2 mt-3 mb-2 d-flex flex-column justify-content-center'
          >
            <h2 className='mb-4' ref={titleRef}>{filterName}</h2>
            <div className='d-flex justify-content-between align-items-center gap-2 mb-3'>
              <Button
                className='p-1 h-100 rounded-4'
                variant={menuOpen ? 'primary' : 'light'}
                onClick={toggleMenu}
                style={{ minWidth: '110px' }}
              >
                {menuOpen
                  ? (<><i className='bi bi-funnel' /> Filtros <i class='bi bi-chevron-up' /></>)
                  : (
                    <>
                      <i className='bi bi-funnel' /> Filtros <i class='bi bi-chevron-down' />
                    </>
                    )}

              </Button>
              <div className='p-2 px-3 rounded-4' style={{ width: '400px', backgroundColor: '#121212' }}>
                <SearchBar ref={searchRef} onSearch={handleSearch} />
              </div>
            </div>
            <FilterMenuAccordion
              menuOpen={menuOpen}
              activeKey={activeKey}
              handleSelect={handleSelect}
              onApplyFilters={handleFiltersAndClearSearch}
              setWasFilterManuallyApplied={setWasFilterManuallyApplied}
            />
            <ShoppingCart isPositionFixed />
            <Products filterURL={filterURL} scrollToProducts={scrollToProducts} />
          </Col>
        </Row>
      </Container>
      <NewsletterCard />
      <div
        className={`position-fixed ${
    showScrollButton ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'
  }`}
        style={{
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        {(showScrollButton || !showScrollButton) && (
          <button
            onClick={scrollToTop}
            className='btn btn-light'
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            <i className='bi bi-chevron-up' />
          </button>
        )}
      </div>
    </main>
  )
}
