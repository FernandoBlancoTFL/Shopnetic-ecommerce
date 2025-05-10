import { useEffect, useState } from 'react'
import { Button, Offcanvas, ListGroup, Badge, Container } from 'react-bootstrap'

export function ShoppingCart ({ cartItems, emptyShoppingCart, removeProductFromCart, addProductToCart }) {
  const [show, setShow] = useState(false)
  const [cartSize, setCartSize] = useState(cartItems.length)
  const [animate, setAnimate] = useState(false)
  const [outOfStockIds, setOutOfStockIds] = useState([])
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (cartItems.length > cartSize) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 800)
    }
    setCartSize(cartItems.length)
  }, [cartItems])

  const handleBuying = () => {
    Swal.fire({
      title: 'Ding ding!',
      text: 'Compra finalizada',
      icon: 'success'
    })
    handleClose()
    emptyShoppingCart()
  }

  const handleAddProductToCart = (product) => {
    if (product.quantity >= product.stock) {
      if (!outOfStockIds.includes(product.id)) {
        setOutOfStockIds(prev => [...prev, product.id])
        setTimeout(() => {
          setOutOfStockIds(prev => prev.filter(id => id !== product.id))
        }, 2000)
      }
      return
    }
    addProductToCart(product)
  }

  return (
    <>
      <Button
        variant='success'
        style={{ padding: '10px 15px' }}
        onClick={handleShow}
        className={`position-fixed top-0 end-0 m-4 mt-4  border border-dark ${animate ? 'animate__animated animate__heartBeat' : ''}`}
      >
        🛒
        {cartItems.length > 0 && (
          <Badge bg='danger' pill className='ms-2'>
            {cartItems.length}
          </Badge>
        )}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0
            ? (
              <p>No hay productos en el carrito.</p>
              )
            : (
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Container className='d-flex flex-row justify-content-center'>
                      <Container className='d-flex align-items-center'>
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        <div className='d-flex flex-column' style={{ width: '200px' }}>
                          <strong>{item.title}</strong>
                          <div className='d-flex justify-content-between mt-1'>
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </Container>
                      <Container className='d-flex flex-row gap-2 align-items-center m'>
                        <div className='d-flex flex-column gap-1'>
                          <Button size='sm' onClick={() => handleAddProductToCart(item)} variant='primary' className='p-2'> <i className='fa-solid fa-plus' /> </Button>
                          <Button size='sm' onClick={() => removeProductFromCart(item.id)} variant='secondary' className='p-2'><i className='fa-solid fa-minus' /></Button>
                        </div>
                        <h5>{item.quantity}</h5>
                      </Container>
                    </Container>
                    {outOfStockIds.includes(item.id) && (
                      <p className='text-danger mt-1 mb-1 text-center'>Lo siento, el stock máximo es de {item.stock} unidades</p>
                    )}
                  </ListGroup.Item>
                )
                )}
                <h5 className='mx-auto mt-3'>Total: $ {totalPrice}</h5>
                <Button variant='success' className='w-50 mx-auto mt-2' onClick={handleBuying}>Finalizar compra <i className='fa-solid fa-bag-shopping' /></Button>
                <Button variant='danger' className='w-50 mx-auto mt-2' onClick={emptyShoppingCart}>Vaciar carrito <i className='fa-solid fa-trash' /></Button>
              </ListGroup>
              )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
