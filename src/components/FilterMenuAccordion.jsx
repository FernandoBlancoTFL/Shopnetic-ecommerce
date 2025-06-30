import { useState, useEffect } from 'react'
import { Collapse, Card, Accordion, Button } from 'react-bootstrap'
import { BuyingButtons } from './BuyingButtons'
import { CATEGORIES } from '../constants/constants'

export function FilterMenuAccordion ({ menuOpen, activeKey, handleSelect, onApplyFilters, setWasFilterManuallyApplied }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedOrderBy, setSelectedOrderBy] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('asc')

  useEffect(() => {
    if (selectedCategory === null && selectedOrderBy === '') {
      applyFilters()
    }
  }, [selectedCategory, selectedOrderBy])

  const handleClickCategory = (value) => {
    setSelectedCategory(value)
  }

  const handleClickOrderBy = (value) => {
    setSelectedOrderBy(value)
  }

  const handleClickOrder = (value) => {
    setSelectedOrder(value)
  }

  const handleEmptyFilter = () => {
    setSelectedCategory(null)
    setSelectedOrderBy('')
  }

  const applyFilters = () => {
    let url = 'https://dummyjson.com/products'
    let label = 'Todos los productos'

    if (selectedCategory) {
      url += `/category/${selectedCategory}`
      label = `Categoría: ${CATEGORIES.find(cat => cat.value === selectedCategory)?.label}`
    }

    const queryParams = []
    if (selectedOrderBy) {
      queryParams.push(`sortBy=${selectedOrderBy.toLowerCase()}`)
      if (selectedOrder) {
        queryParams.push(`order=${selectedOrder.toLowerCase()}`)
      }
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`
      label += ` | Ordenado por: ${selectedOrderBy} ${selectedOrder === 'asc' ? 'ascendente' : 'descendente'}`
    }

    setWasFilterManuallyApplied(true)
    onApplyFilters(url, label)
  }

  return (
    <Collapse in={menuOpen}>
      <div>
        <Card className='text-dark mb-4'>
          <Card.Body className='bg-white'>

            <Accordion activeKey={activeKey} onSelect={handleSelect}>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Categoría</Accordion.Header>
                <Accordion.Body>
                  <div className='d-flex flex-wrap gap-2'>
                    {CATEGORIES.map(({ label, value }) => (
                      <Button
                        key={value}
                        className='rounded-pill'
                        variant={selectedCategory === value ? 'primary' : 'outline-primary'}
                        onClick={() => handleClickCategory(value)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey='1'>
                <Accordion.Header>Ordenar por</Accordion.Header>
                <Accordion.Body className='d-flex justify-content-center'>
                  <div className='d-flex gap-2 border p-1 rounded-pill'>
                    <Button
                      className='rounded-pill'
                      variant={selectedOrderBy === 'price' ? 'primary' : 'outline-primary'}
                      onClick={() => handleClickOrderBy('price')}
                    >Precio
                    </Button>
                    <Button
                      className='rounded-pill'
                      variant={selectedOrderBy === 'rating' ? 'primary' : 'outline-primary'}
                      onClick={() => handleClickOrderBy('rating')}
                    >Rating
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey='2'>
                <Accordion.Header>Orden</Accordion.Header>
                <Accordion.Body className='d-flex justify-content-center'>
                  <div className='d-flex gap-2 border p-1 rounded-pill'>
                    <Button
                      className='rounded-pill'
                      variant={selectedOrder === 'asc' ? 'primary' : 'outline-primary'}
                      onClick={() => handleClickOrder('asc')}
                    >Ascendente
                    </Button>
                    <Button
                      className='rounded-pill'
                      variant={selectedOrder === 'desc' ? 'primary' : 'outline-primary'}
                      onClick={() => handleClickOrder('desc')}
                    >Descendente
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className='d-flex justify-content-center'>
              <BuyingButtons
                firstButtonText='Vaciar filtros 🗑️'
                firstButtonVariant='danger'
                secondButtonText='Aplicar filtros 🔍'
                secondButtonVariant='success'
                firstButtonEvent={handleEmptyFilter}
                secondButtonEvent={applyFilters}
              />
            </div>

          </Card.Body>
        </Card>
      </div>
    </Collapse>
  )
}
