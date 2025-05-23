import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner, Row, Col, Container, Card, Button } from 'react-bootstrap'

export function ProductDetail () {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState('')

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setMainImage(data.images[0])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error al obtener producto:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation='border' />
      </div>
    )
  }

  if (!product) return <h3>No se encontró el producto</h3>

  return (
    <>
      <Container className='py-5'>
        <Card className='shadow p-4'>
          <Row className='align-items-start'>
            {/* Columna de la imagen principal + miniaturas */}
            <Col md={6} className='text-center mb-4 mb-md-0'>

              {/* Imagen principal */}
              <img
                src={mainImage}
                alt={product.title}
                className='img-fluid rounded mb-3'
                style={{ height: '300px', objectFit: 'contain' }}
              />

              {/* Contenedor de miniaturas */}
              <Row className='g-2 justify-content-center'>
                {product.images.map((img, index) => (
                  <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} style={{ width: '80px', justifyItems: 'center' }} key={index}>
                    <Card
                      className='shadow-sm'
                      style={{ cursor: 'pointer', width: '70px', border: mainImage === img ? '2px solid #0d6efd' : '1px solid #ccc' }}
                      onClick={() => setMainImage(img)}
                    >
                      <Card.Img
                        src={img}
                        alt={`Miniature ${index + 1}`}
                        style={{ height: '70px', objectFit: 'contain', padding: '2px' }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* Detalles a la derecha */}
            <Col md={6}>
              <h2 className='mb-3'>{product.title}</h2>
              <h4 className='mb-3 text-success'>$ {product.price}</h4>
              <p className='text-muted'>{product.description}</p>
              <div className='d-flex gap-2'>
                <Button variant='primary'>Comprar 🛍</Button>
                <Button variant='success'>Agregar al carrito 🛒</Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  )
}
