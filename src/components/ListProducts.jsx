import { Row, Col, Card, Button, Carousel } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { Link } from 'react-router-dom'
import { StarRating } from './StarRating'

export function ListOfProducts ({ products }) {
  const { handleAddProductToCart, clickedIds } = useContext(ShoppingCartContext)

  const getPriceWithoutDiscount = (product) => {
    const priceWithoutDiscount = (product.price / (1 - (product.discountPercentage / 100))).toFixed(2)
    return priceWithoutDiscount
  }

  return (
    <>
      <Row xs={1} sm={1} md={2} lg={3} xl={3} className='g-4'>
        {
        products.slice(0, 9).map(product => (
          <Col key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className='overflow-hidden border-0 shadow-sm bg-white rounded' style={{ height: '430px' }}>
                {product.images.length > 1
                  ? (
                    <Carousel interval={null} indicators={false} className='p-2'>
                      {product.images.slice(0, 3).map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className='d-block w-100 zoom-img'
                            src={img}
                            alt={`Imagen ${index + 1}`}
                            style={{
                              height: '185px',
                              objectFit: 'contain',
                              transition: 'transform 0.3s ease-in-out'
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    )
                  : (
                    <Card.Img
                      className='p-2 zoom-img'
                      variant='top'
                      src={product.thumbnail}
                      style={{
                        height: '200px',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                    />
                    )}

                <Card.Body className='d-flex flex-column bg-dark text-white rounded-bottom'>
                  <Card.Title className='text-truncate mb-0'>{product.title}</Card.Title>
                  <div
                    className='d-flex flex-wrap justify-content-between align-items-center  m-1'
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    <div className='d-flex gap-2 align-items-center'>
                      <Card.Text className='text-success fw-bold mb-0' style={{ fontSize: '18px' }}>$ {product.price}</Card.Text>
                      <Card.Text style={{ fontSize: '14px' }}><s>$ {getPriceWithoutDiscount(product)}</s></Card.Text>
                    </div>
                    <StarRating rating={product.rating} size='12px' />
                  </div>
                  <Card.Text className='truncate-description mb-0'>{product.description}</Card.Text>
                  <div
                    className='d-flex flex-wrap justify-content-between align-items-center  m-1'
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    <Button
                      style={{ marginTop: '10px', minWidth: '80px', width: '100%', padding: '3px 5px' }}
                      variant={clickedIds.includes(product.id) ? 'success' : 'primary'}
                      disabled={clickedIds.includes(product.id)}
                      onClick={() => {
                        handleAddProductToCart(product)
                      }}
                    >
                      {clickedIds.includes(product.id) ? 'Agregado 🛒' : 'Agregar al carrito 🛒'}
                    </Button>
                  </div>

                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))
      }
      </Row>
    </>
  )
}

function NoProductsResult () {
  const [message, setMessage] = useState('Cargando productos...')

  return <h3>{message}</h3>
}

export function Products ({ filterURL }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetch(filterURL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(response => {
        setProducts(response.products)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error)
        setLoading(true)
        setHasError(true)
      })
  }, [filterURL])

  if (hasError) return <h3>Error al cargar los productos. Inténtalo más tarde.</h3>

  return (
    loading
      ? <NoProductsResult />
      : <ListOfProducts products={products} />
  )
}
