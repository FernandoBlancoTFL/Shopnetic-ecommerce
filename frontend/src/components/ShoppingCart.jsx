import { useContext, useEffect, useState } from 'react'
import { CartItem } from './CartItem'
import { BuyingButtons } from './BuyingButtons'
import { Button, Offcanvas, ListGroup, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { OrderContext } from '../context/OrderContext'
import { AuthContext } from '../context/AuthContext'
import { getUserCartFromLocalStorage, getUserCartProductsFromLocalStorage, setUserCartProductsToLocalStorage, setUserCartToLocalStorage } from '../utils/userCartFromLocalStorage'

export function ShoppingCart ({ isPositionFixed = false }) {
  const { user } = useContext(AuthContext)
  const { shoppingCart, shoppingCartProducts, addProductToCart, getUserShoppingCartByUserId, handleProductQuantity, emptyShoppingCart } = useContext(ShoppingCartContext)
  const { createUserOrderByUserId } = useContext(OrderContext)
  const [cart, setCar] = useState([])
  const [show, setShow] = useState(false)
  const [cartSize, setCartSize] = useState(shoppingCartProducts ? shoppingCartProducts.length : 0)
  const [animate, setAnimate] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (shoppingCartProducts.length > cartSize) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 800)
    }
    setCartSize(shoppingCartProducts.length)
  }, [shoppingCartProducts])

  useEffect(() => {
    if (user) {
      const syncCart = async () => {
        const guestCart = getUserCartProductsFromLocalStorage()

        const products = await getUserShoppingCartByUserId()

        if (!guestCart || guestCart.length === 0) return

        Swal.fire({
          title: 'Unión de carrito de compras',
          text: 'Hemos detectado que agregaste productos al carrito antes de iniciar sesión. ¿Quieres unir los productos almacenados en tu carrito de compras?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Unir carritos',
          customClass: {
            popup: 'my-swal-popup',
            backdrop: 'my-swal-backdrop'
          },
          willOpen: () => {
            const swalEl = document.querySelector('.swal2-popup')
            const backdropEl = document.querySelector('.swal2-backdrop')
            if (swalEl) swalEl.style.setProperty('z-index', '9999', 'important')
            if (backdropEl) backdropEl.style.setProperty('z-index', '9998', 'important')
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            for (const guestProduct of guestCart) {
              const existingProduct = products.find(
                p => p.productId === guestProduct.productId
              )

              if (!existingProduct) {
                await addProductToCart(guestProduct.productId, guestProduct.quantity)
              } else if (existingProduct.quantity !== guestProduct.quantity) {
                await addProductToCart(
                  guestProduct.productId,
                  guestProduct.quantity
                )
              }
            }

            setUserCartToLocalStorage([])
            setUserCartProductsToLocalStorage([])
          }
        })
      }

      syncCart()
    }
    if (!user) {
      getUserShoppingCartByUserId()
      setUserCartToLocalStorage([])
      setUserCartProductsToLocalStorage([])
    }
  }, [user])

  const handleEmptyCart = () => {
    if (!isPositionFixed) {
      setShow(false)
    }
    Swal.fire({
      title: 'Vaciar carrito',
      text: '¿Estas seguro que quieres vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, vaciar carrito',
      customClass: {
        popup: 'my-swal-popup',
        backdrop: 'my-swal-backdrop'
      },
      willOpen: () => {
        const swalEl = document.querySelector('.swal2-popup')
        const backdropEl = document.querySelector('.swal2-backdrop')
        if (swalEl) swalEl.style.setProperty('z-index', '9999', 'important')
        if (backdropEl) backdropEl.style.setProperty('z-index', '9998', 'important')
      }
    }).then((result) => {
      if (result.isConfirmed) {
        emptyShoppingCart()
      }
    })
  }

  const handleFinishBuy = async () => {
    handleClose()
    if (!user) return

    await createUserOrderByUserId()
    await emptyShoppingCart()
  }

  return (
    <>
      <Button
        variant='success'
        style={{ padding: '10px 15px', zIndex: '1000' }}
        onClick={handleShow}
        className={`${isPositionFixed ? 'position-fixed top-0 end-0 m-4 mt-4 d-none d-lg-inline border border-dark' : 'd-inline d-lg-none bg-transparent border-0'} ${animate ? 'animate__animated animate__heartBeat' : ''}`}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <i className={`bi bi-cart-fill ${isPositionFixed ? '' : 'fs-2'}`} />

          {shoppingCartProducts.length > 0
            ? isPositionFixed
              ? (
                <Badge bg='danger' pill className='ms-2'>
                  {shoppingCartProducts.length}
                </Badge>
                )
              : (
                <Badge
                  bg='danger'
                  pill
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    fontSize: '0.75rem',
                    padding: '4px 6px'
                  }}
                >
                  {shoppingCartProducts.length}
                </Badge>
                )
            : null}
        </div>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop style={{ zIndex: '2000' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {shoppingCartProducts.length === 0
            ? (
              <p className='text-center'>No hay productos en el carrito.</p>
              )
            : (
              <ListGroup variant='flush'>
                {shoppingCartProducts.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <CartItem
                      item={item}
                      addProductToCart={addProductToCart}
                      handleProductQuantity={handleProductQuantity}
                      setShow={setShow}
                    />
                  </ListGroup.Item>
                )
                )}
                <h5 className='mx-auto mt-3'>Total: $ {shoppingCart.totalDiscountedProducts}</h5>
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
                  firstButtonEvent={() => handleFinishBuy()}
                  firstButtonAs={Link}
                  firstButtonTo='/checkout'
                  secondButtonEvent={() => handleEmptyCart()}
                />
              </ListGroup>
              )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
