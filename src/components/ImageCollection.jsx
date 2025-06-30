import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/ImageCollection.css'

export function ImageCollection ({ handleFilter, scrollToProducts }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const rightImages = [
    { src: '/img/modaMinimalista.png', label: 'Moda minimalista', category: 'womens-dresses' },
    { src: '/img/MacetasPlantas.png', label: 'Macetas y Plantas', category: 'home-decoration' },
    { src: '/img/BrownPC.png', label: 'Laptops', category: 'laptops' },
    { src: '/img/BlueCar.png', label: 'Vehículos', category: 'vehicle' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleCategoryClick = (categoryName, label) => {
    handleFilter(`https://dummyjson.com/products/category/${categoryName}`, label)
    scrollToProducts()
  }

  return (
    <Container
      fluid
      className='img-collection py-2 mx-1'
      style={{ maxWidth: '1100px' }}
    >
      <Row
        className='gx-2 align-items-stretch flex-column flex-md-row'
        style={{ minHeight: '850px' }}
      >
        <h2 className='mb-4'>Principales categorías</h2>

        <Col
          ref={sectionRef}
          xs={12}
          md={6}
          className={`img-collection-col1 mb-2 mb-md-0 d-flex flex-column ${isVisible ? 'animate__animated animate__fadeInUp' : ''}`}
        >
          <div
            className='image-container shadow'
            onClick={() => handleCategoryClick('furniture', 'Muebles')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src='/img/hogarSimple.png'
              alt='Principal'
              className='w-100 h-100 object-fit-cover image-hover'
              style={{ objectPosition: 'center' }}
            />
            <div className='image-label'>Muebles</div>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          className='img-collection-col2 d-flex flex-wrap gap-2'
        >
          {rightImages.map((img, index) => (
            <div
              key={index}
              className='image-container rounded overflow-hidden'
              onClick={() => handleCategoryClick(img.category, img.label)}
              style={{
                width: 'calc(50% - 0.5rem)',
                height: 'calc(50% - 0.5rem)',
                minWidth: '47%',
                flexGrow: 1,
                cursor: 'pointer'
              }}
            >
              <img
                src={img.src}
                alt={`Imagen ${index + 1}`}
                className='w-100 h-100 object-fit-cover image-hover'
              />
              <div className='image-label'>{img.label}</div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  )
}
