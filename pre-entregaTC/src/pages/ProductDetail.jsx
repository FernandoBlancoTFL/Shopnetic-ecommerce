import { QuantitySelector } from '../components/QuantitySelector'
import { StarRating } from '../components/StarRating'
import { UserReview } from '../components/UserReview'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner, Row, Col, Container, Card, Button } from 'react-bootstrap'

export function ProductDetail () {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])

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

  useEffect(() => {
    if (!product) return

    const fetchRelated = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${product.category}`)
        const data = await response.json()

        const filteredProducts = data.products.filter(p => p.id !== product.id)
        setRelatedProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    fetchRelated()
  }, [product])

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation='border' />
      </div>
    )
  }

  if (!product) return <h3>No se encontró el producto</h3>
  const priceWithoutDiscount = (product.price / (1 - (product.discountPercentage / 100))).toFixed(2)

  return (
    <>
      <Container className='py-5'>
        <Card className='shadow p-4'>
          <Row className='align-items-start'>
            <Col md={6} className='text-center mb-4 mb-md-0'>
              <img
                src={mainImage}
                alt={product.title}
                className='img-fluid rounded mb-3'
                style={{ height: '300px', objectFit: 'contain' }}
              />
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
            <Col md={6}>
              <p className='mb-0'>{product.brand}</p>
              <h2 className='mb-1'>{product.title}</h2>
              <div className='d-flex align-items-center gap-2 mb-2'>
                <p style={{ fontSize: '14px', marginBottom: '5px', color: '#ff8f00' }}>{product.rating}</p>
                <h3><StarRating rating={product.rating} size={14} /></h3>
              </div>
              <h6 className='mb-0'><s>$ {priceWithoutDiscount}</s></h6>
              <div className='d-flex align-items-center gap-2 mb-3'>
                <h4 className='mb-0'>$ {product.price}</h4>
                <h6 className='mb-0 text-success'>{product.discountPercentage}% OFF</h6>
              </div>
              <p className='text-muted'>{product.description}</p>
              <p className='mb-1'>{product.availabilityStatus}</p>
              <div className='d-flex align-items-center gap-2 mb-2'>
                <p className='mb-0'>Cantidad: <strong>1 unidad</strong></p>
                <p className='text-muted mb-0'>({product.stock > 50 ? '+50 disponibles' : `${product.stock} disponibles`})</p>
              </div>
              <QuantitySelector />
              <div className='d-flex gap-2 my-2'>
                <Button variant='primary'>Comprar 🛍</Button>
                <Button variant='success'>Agregar al carrito 🛒</Button>
              </div>
              <div className='mt-4'>
                <p className='mb-1'><i class='bi bi-truck' /> {product.shippingInformation}</p>
                <p className='mb-1'><i class='bi bi-arrow-return-left' /> {product.returnPolicy}</p>
                <p className='mb-1'><i class='bi bi-shield-check' /> {product.warrantyInformation}</p>
              </div>
            </Col>
          </Row>
          <Row className='align-items-start mt-5'>
            <Col md={6} className='mb-4 mb-md-0'>
              <h5 className='mb-4 text-start'>Características del producto:</h5>
              <div className='d-flex justify-content-center mb-3'>
                <table className='table table-bordered w-75'>
                  <tbody>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle'><strong>Marca</strong></td>
                      <td className='align-middle text-center bg-info-subtle'>{product.brand}</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center'><strong>SKU</strong></td>
                      <td className='align-middle text-center'>{product.sku}</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle'><strong>Largo</strong></td>
                      <td className='align-middle text-center bg-info-subtle'>{product.dimensions.width} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center'><strong>Alto</strong></td>
                      <td className='align-middle text-center'>{product.dimensions.height} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle'><strong>Ancho</strong></td>
                      <td className='align-middle text-center bg-info-subtle'>{product.dimensions.depth} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center'><strong>Peso</strong></td>
                      <td className='align-middle text-center'>{product.weight} g</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle'><strong>Código de barras</strong></td>
                      <td className='align-middle text-center bg-info-subtle'>{product.meta.barcode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                <div className='d-flex p-2 w-75 justify-content-between border border-black rounded' style={{ backgroundColor: '#3c3c3c' }}>
                  <div>
                    <h5 className='m-0 text-white'>{product.title}</h5>
                    <p className='m-0 text-white'>{product.brand}</p>
                    <p className='m-0 text-white'>Código QR</p>
                  </div>
                  <div className='p-0 border border-black m-1 bg-light'>
                    <img
                      src={product.meta.qrCode}
                      alt={product.title}
                      className='img-fluid rounded'
                      style={{ height: '100px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h5 className='mb-3'>Opiniones del producto:</h5>
              <div className='d-flex align-items-center gap-2 mb-2'>
                <p style={{ fontSize: '24px', marginBottom: '5px', color: '#ff8f00' }}>{product.rating}</p>
                <h3><StarRating rating={product.rating} size={24} /></h3>
              </div>
              {product.reviews.map((review, index) =>
                <UserReview key={index} name={review.reviewerName} email={review.reviewerEmail} rating={review.rating} comment={review.comment} date={review.date} />
              )}
            </Col>
          </Row>
          <Row className='align-items-start mt-5'>
            <h4 className='mt-4'>También te puede interesar</h4>
            <CategoryCarousel products={relatedProducts} />
          </Row>
        </Card>
      </Container>
    </>
  )
}
