import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

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

  return (
    <div className='position-relative'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <Button variant='outline-primary' onClick={handlePrev} disabled={index === 0}>
          ◀
        </Button>
        <Button variant='outline-primary' onClick={handleNext} disabled={index === maxIndex}>
          ▶
        </Button>
      </div>

      <div className='row'>
        {currentItems.map(product => (
          <div key={product.id} className='col-12 col-sm-6 col-lg-3 mb-3'>
            <Card className='h-100'>
              <Card.Img variant='top' src={product.thumbnail} style={{ height: '180px', objectFit: 'cover' }} />
              <Card.Body className='text-center'>
                <Card.Title className='fs-6'>{product.title}</Card.Title>
                <Card.Text className='text-success fw-semibold'>${product.price.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
