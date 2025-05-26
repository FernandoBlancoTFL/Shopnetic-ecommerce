import { useContext, useEffect, useState } from 'react'
import { CartItem } from './CartItem'
import { BuyingButtons } from './BuyingButtons'
import { Button, Offcanvas, ListGroup, Badge } from 'react-bootstrap'
import { ShoppingCartContext } from '../context/ShoppingCartContext'

export function ShoppingCart () {
  const { shoppingCart, addProductToCart, removeProductFromCartById, emptyShoppingCart } = useContext(ShoppingCartContext)
  const [show, setShow] = useState(false)
  const [cartSize, setCartSize] = useState(shoppingCart.length)
  const [animate, setAnimate] = useState(false)
  const totalPrice = shoppingCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (shoppingCart.length > cartSize) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 800)
    }
    setCartSize(shoppingCart.length)
  }, [shoppingCart])

  const handleBuying = () => {
    Swal.fire({
      title: 'Ding ding!',
      text: 'Compra finalizada',
      icon: 'success'
    })
    handleClose()
    emptyShoppingCart()
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
        {shoppingCart.length > 0 && (
          <Badge bg='danger' pill className='ms-2'>
            {shoppingCart.length}
          </Badge>
        )}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop style={{ zIndex: 9999 }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {shoppingCart.length === 0
            ? (
              <p>No hay productos en el carrito.</p>
              )
            : (
              <ListGroup variant='flush'>
                {shoppingCart.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <CartItem item={item} addProductToCart={addProductToCart} removeProductFromCartById={removeProductFromCartById} />
                  </ListGroup.Item>
                )
                )}
                <h5 className='mx-auto mt-3'>Total: $ {totalPrice}</h5>
                <BuyingButtons
                  firstButtonText='Finalizar compra'
                  secondButtonText='Vaciar carrito'
                  firstButtonVariant='success'
                  secondButtonVariant='danger'
                  firstButtonIconClass='fa-solid fa-bag-shopping'
                  secondButtonIconClass='fa-solid fa-trash'
                  firstButtonFontSize='fs-7'
                  secondButtonFontSize='fs-7'
                  buttonSize='sm'
                  firstButtonEvent={handleBuying}
                  secondButtonEvent={emptyShoppingCart}
                />
              </ListGroup>
              )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
