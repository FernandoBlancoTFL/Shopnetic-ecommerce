import React, { useState } from 'react'
import { StarRating } from './StarRating'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function CategoryCarousel ({ products }) {
  const [index, setIndex] = useState(0)

  const itemsPerPage = 4
  const maxIndex = Math.max(0, Math.ceil(products.length / itemsPerPage) - 1)

  const handleNext = () => {
    if (index < maxIndex) setIndex(index + 1)
  }

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  const start = index * itemsPerPage
  const currentItems = products.slice(start, start + itemsPerPage)

  const getProductPriceWithoutDiscount = (product) => {
    const priceWithoutDiscount = (product.price / (1 - (product.discountPercentage / 100))).toFixed(2)
    return priceWithoutDiscount
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-center position-relative'>
        <Button
          variant='light'
          onClick={handlePrev}
          disabled={index === 0}
          className='me-2 d-none d-md-flex align-items-center justify-content-center rounded-circle shadow-sm'
          style={{ width: '40px', height: '40px' }}
        >
          <i className='bi bi-chevron-left fs-5' />
        </Button>
        <div className='d-flex flex-wrap justify-content-center gap-3'>
          {currentItems.map(product => (
            <Card
              key={product.id}
              className='shadow border-0'
              style={{ width: '160px', minHeight: '290px', overflow: 'hidden' }}
            >
              <div className='overflow-hidden' style={{ height: '130px' }}>
                <Card.Img
                  variant='top'
                  src={product.thumbnail}
                  alt={product.title}
                  className='img-fluid transition-scale'
                  style={{ height: '100%', width: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <Card.Body className='text-center p-2 d-flex flex-column justify-content-between bg-dark text-white' style={{ height: '160px' }}>
                <div className='d-flex flex-column align-items-center gap-1'>
                  <Card.Title className='fs-6 mb-1 text-white'>{product.title}</Card.Title>
                  <StarRating rating={product.rating} size={12} />
                  <div className='d-flex gap-2 mt-2 align-items-center'>
                    <Card.Text className='mb-2' style={{ color: '#FAF9F6' }}><s>${getProductPriceWithoutDiscount(product)}</s></Card.Text>
                    <Card.Text className='text-success fw-semibold mb-2'>${product.price.toFixed(2)}</Card.Text>
                  </div>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className='btn btn-primary btn-sm'
                >
                  Ver detalle
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
        <Button
          variant='light'
          onClick={handleNext}
          disabled={index === maxIndex}
          className='ms-2 d-none d-md-flex align-items-center justify-content-center rounded-circle shadow-sm'
          style={{ width: '40px', height: '40px' }}
        >
          <i className='bi bi-chevron-right fs-5' />
        </Button>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className='mx-1'
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              display: 'inline-block',
              backgroundColor: i === index ? '#343a40' : '#ced4da',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>
    </>
  )
}
