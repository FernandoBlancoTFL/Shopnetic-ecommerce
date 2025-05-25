import { Row, Col, Card, Button, Carousel } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ListOfProducts ({ products, handleClick, handleIds, clickedIds }) {
  const handleAddProductToCart = (product) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title: '✅ ¡Producto agregado correctamente!',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#ffffff',
      customClass: {
        popup: 'swal2-toast-custom'
      },
      didOpen: (toast) => {
        toast.style.marginTop = '84px'
        toast.style.width = '800px'
      }
    })
    handleIds(product.id)
    handleClick(product)
  }

  return (
    <>
      <Row xs={1} sm={1} md={2} lg={3} xl={3} className='g-4'>
        {
        products.slice(0, 9).map(product => (
          <Col key={product.id} className='h-10'>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className='h-400 overflow-hidden border-0 shadow-sm bg-white rounded' style={{ height: '420px' }}>
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
                  <Card.Title className='text-truncate'>{product.title}</Card.Title>
                  <Card.Text className='truncate-description'>{product.description}</Card.Text>
                  <div
                    className='d-flex flex-wrap justify-content-between align-items-center mt-auto'
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    <span className='text-success'><h5>$ {product.price}</h5></span>
                    <Button
                      style={{ minWidth: '80px', padding: '3px 5px' }}
                      variant={clickedIds.includes(product.id) ? 'success' : 'primary'}
                      disabled={clickedIds.includes(product.id)}
                      onClick={() => {
                        handleAddProductToCart(product)
                      }}
                    >
                      {clickedIds.includes(product.id) ? 'Agregado 🛒' : 'Agregar 🛒'}
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

export function Products ({ filterURL, handleClick, handleIds, clickedIds }) {
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
      : <ListOfProducts products={products} handleClick={handleClick} handleIds={handleIds} clickedIds={clickedIds} />
  )
}
