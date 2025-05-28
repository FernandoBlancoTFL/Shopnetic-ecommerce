import { QuantitySelector } from '../components/QuantitySelector'
import { BuyingButtons } from '../components/BuyingButtons'
import { StarRating } from '../components/StarRating'
import { UserReview } from '../components/UserReview'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { ShoppingCart } from '../components/ShoppingCart'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Spinner, Row, Col, Container, Card } from 'react-bootstrap'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { CustomBreadcrumb } from './CustomBreadcrumb'
import { Box, House } from 'react-bootstrap-icons'

export function ProductDetail () {
  const { id } = useParams()
  const { addProductToCart, getOrInitializeProductInCart, handleAddProductToCart, removeProductFromCartById, clickedIds } = useContext(ShoppingCartContext)
  const [product, setProduct] = useState(null)
  const [productQuantity, setProductQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(product => {
        setProduct(product)
        setMainImage(product.images[0])
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

  const insertProductQuantity = (quantity) => {
    setProductQuantity(quantity)
  }

  const handleAddProductToCartWithquantity = (product) => {
    const newProductQuantity = productQuantity
    const productWithQuantity = getOrInitializeProductInCart(product)
    productWithQuantity.quantity = newProductQuantity
    handleAddProductToCart(productWithQuantity)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <main className='flex-grow-1 bg-secondary text-white'>
      <ShoppingCart isPositionFixed />
      <Container className='py-5 bg-secondary'>
        <CustomBreadcrumb routes={[{ name: 'Inicio', path: '/', icon: <House size={16} /> }, { name: product.title, path: `/product/${product.id}`, icon: <Box size={16} /> }]} />
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
                <p className='mb-0'>Cantidad: {clickedIds.includes(product.id)
                  ? (getOrInitializeProductInCart(product).quantity > 1 ? <strong>{getOrInitializeProductInCart(product).quantity} unidades</strong> : <strong>{getOrInitializeProductInCart(product).quantity} unidad</strong>)
                  : (productQuantity > 1 ? <strong>{productQuantity} unidades</strong> : <strong>{productQuantity} unidad</strong>)}
                </p>
                <p className='text-muted mb-0'>({product.stock > 50 ? '+50 disponibles' : `${product.stock} disponibles`})</p>
              </div>
              <QuantitySelector item={getOrInitializeProductInCart(product)} handleAddProductToCart={addProductToCart} removeProductFromCartById={removeProductFromCartById} insertProductQuantity={quantity => insertProductQuantity(quantity)} shouldDecreaseToZero={false} isProductInCart={clickedIds.includes(product.id)} />
              <BuyingButtons
                firstButtonText={clickedIds.includes(product.id) ? 'Agregado 🛒' : 'Agregar al carrito 🛒'}
                secondButtonText='Comprar 🛍'
                firstButtonVariant={clickedIds.includes(product.id) ? 'success' : 'success'}
                firstButtonDisabled={clickedIds.includes(product.id)}
                secondButtonVariant='primary'
                firstButtonEvent={clickedIds.includes(product.id) ? () => handleAddProductToCart(product) : () => handleAddProductToCartWithquantity(product)}
                buttonSize='lg'
              />
              <div className='d-flex gap-5'>
                <div className='mt-3'>
                  <p className='mb-1'><i class='bi bi-truck' /> {product.shippingInformation}</p>
                  <p className='mb-1'><i class='bi bi-arrow-return-left' /> {product.returnPolicy}</p>
                  <p className='mb-1'><i class='bi bi-shield-check' /> {product.warrantyInformation}</p>
                </div>
                <div className='mx-5 mt-3'>
                  <p className='mb-1 fw-semibold'>Compartir:</p>
                  <div className='d-flex gap-3 mx-2'>
                    <i className='bi bi-facebook fs-3 text-primary' style={{ cursor: 'pointer' }} />
                    <i className='bi bi-twitter fs-3' style={{ cursor: 'pointer', color: '#1DA1F2' }} />
                    <i className='bi bi-pinterest fs-3' style={{ cursor: 'pointer', color: '#E60023' }} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='align-items-start mt-sm-3 mt-md-5'>
            <Col md={6} className='mb-4 mb-md-0'>
              <h5 className='mb-4 text-start'>Características del producto:</h5>
              <div className='d-flex justify-content-center mb-3'>
                <table className='table table-bordered w-75'>
                  <tbody>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle fw-semibold'>Marca</td>
                      <td className='align-middle text-center bg-info-subtle'>{product.brand ? product.brand : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center fw-semibold'>SKU</td>
                      <td className='align-middle text-center'>{product.sku ? product.sku : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle fw-semibold'>Largo</td>
                      <td className='align-middle text-center bg-info-subtle'>{product.dimensions.width ? product.dimensions.width : 'N/A'} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center fw-semibold'>Alto</td>
                      <td className='align-middle text-center'>{product.dimensions.height ? product.dimensions.height : 'N/A'} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle fw-semibold'>Ancho</td>
                      <td className='align-middle text-center bg-info-subtle'>{product.dimensions.depth ? product.dimensions.depth : 'N/A'} cm</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center fw-semibold'>Peso</td>
                      <td className='align-middle text-center'>{product.weight ? product.weight : 'N/A'} g</td>
                    </tr>
                    <tr>
                      <td className='align-middle text-center bg-info-subtle fw-semibold'>Código de barras</td>
                      <td className='align-middle text-center bg-info-subtle'>{product.meta.barcode ? product.meta.barcode : 'N/A'}</td>
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
          <Row className='align-items-start mt-2'>
            <h4 className='mt-2 mb-4'>También te puede interesar</h4>
            <CategoryCarousel products={relatedProducts} />
          </Row>
        </Card>
      </Container>
    </main>
  )
}
