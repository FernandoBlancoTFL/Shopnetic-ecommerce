import { createContext, useState, useContext, useEffect } from 'react'
import { USER_SHOPPING_CART_URL, SHOPPING_CART_URL, PRODUCTS_URL } from '../constants/constants'
import { AuthContext } from './AuthContext'
import { getUserAccessTokenFromLocalStorage } from '../utils/getUserAccessTokenFromLocalStorage'
import { getUserCartFromLocalStorage, getUserCartProductsFromLocalStorage, setUserCartToLocalStorage, setUserCartProductsToLocalStorage } from '../utils/userCartFromLocalStorage'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider ({ children }) {
  const { user } = useContext(AuthContext)
  const tokenFromLocalStorage = getUserAccessTokenFromLocalStorage()
  const [shoppingCart, setShoppingCart] = useState([])
  const [shoppingCartProducts, setShoppingCartProducts] = useState([])

  useEffect(() => {
    if (!user) {
      setUserCartToLocalStorage(shoppingCart)
    }
  }, [shoppingCart, user])

  useEffect(() => {
    if (!user) {
      setUserCartProductsToLocalStorage(shoppingCartProducts)
    }
  }, [shoppingCartProducts, user])

  const getUserShoppingCartByUserId = async () => {
    if (!user) {
      setShoppingCart(getUserCartFromLocalStorage())
      setShoppingCartProducts(getUserCartProductsFromLocalStorage())
    } else {
      const response = await fetch(`${USER_SHOPPING_CART_URL}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`
        }
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const shoppingCartResponse = await response.json()
      setShoppingCart(shoppingCartResponse)
      setShoppingCartProducts(shoppingCartResponse.items)
      return shoppingCartResponse.items
    }
  }

  useEffect(() => {
    const loadCart = async () => {
      await getUserShoppingCartByUserId()
    }

    loadCart()
  }, [])

  const handleAddProductToCart = (productId, shouldShowAlert = true) => {
    if (shouldShowAlert) {
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
    }
    addProductToCart(productId)
  }

  const getProductByProductId = async (productId) => {
    const response = await fetch(`${PRODUCTS_URL}/${productId}`, {
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    return await response.json()
  }

  function calculateCart (products) {
    const cartId = 1

    const items = products.map(product => ({
      id: product.id,
      cartId,
      productId: product.productId,
      productTitle: product.productTitle,
      productImage: product.productImage,
      quantity: product.quantity,
      stock: product.stock,
      total: Number(product.total.toFixed(2)),
      discountedTotal: Number(product.discountedTotal)
    }))

    const total = items.reduce((acc, item) => acc + item.total, 0)
    const totalDiscountedProducts = items.reduce((acc, item) => acc + item.discountedTotal, 0)
    const totalProducts = items.length
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

    return {
      id: 1,
      userId: 1,
      total: Number(total.toFixed(2)),
      totalDiscountedProducts: Number(totalDiscountedProducts.toFixed(2)),
      totalProducts,
      totalQuantity,
      items
    }
  }

  const addProductToCart = async (productId, productQuantity = 1) => {
    if (!user) {
      const product = await getProductByProductId(productId)

      const productWithQuantity = {
        id: 1,
        cartId: 1,
        productId: product.id,
        productTitle: product.title,
        productImage: product.images[0],
        quantity: productQuantity,
        stock: product.stock,
        total: product.price * productQuantity,
        discountedTotal: (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)
      }

      setShoppingCartProducts(prevCart => {
        const exists = prevCart.some(item => item.productId === productWithQuantity.productId)
        const updatedCart = exists
          ? prevCart.map(item =>
            item.productId === productWithQuantity.productId
              ? { ...item, quantity: productQuantity }
              : item
          )
          : [...prevCart, productWithQuantity]

        const newShoppingCart = calculateCart(updatedCart)
        setShoppingCart(newShoppingCart)
        return updatedCart
      })
    } else {
      const response = await fetch(SHOPPING_CART_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenFromLocalStorage}`
        },
        body: JSON.stringify({
          productId,
          quantity: productQuantity
        })
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const shoppingCartResponse = await response.json()
      setShoppingCart(shoppingCartResponse)
      setShoppingCartProducts(shoppingCartResponse.items)
    }
  }

  const handleProductQuantity = async (productId, newQuantity) => {
    if (!user) {
      setShoppingCartProducts(prevProducts => {
        let updatedProducts
        if (newQuantity > 0) {
          updatedProducts = prevProducts.map(product =>
            product.productId === productId
              ? { ...product, quantity: newQuantity }
              : product
          )
        } else {
          updatedProducts = prevProducts.filter(product => product.productId !== productId)
        }
        setUserCartProductsToLocalStorage(updatedProducts)
        const newShoppingCart = calculateCart(updatedProducts)
        setShoppingCart(newShoppingCart)
        return updatedProducts
      })
    } else {
      const response = await fetch(`${SHOPPING_CART_URL}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenFromLocalStorage}`
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        })
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const shoppingCartResponse = await response.json()
      setShoppingCart(shoppingCartResponse)
      setShoppingCartProducts(shoppingCartResponse.items)
    }
  }

  const removeProductFromCartByProductId = async (productId) => {
    if (!user) {
      setShoppingCartProducts(prevProducts => {
        const updatedProducts = prevProducts.filter(product => product.productId !== productId)
        setUserCartProductsToLocalStorage(updatedProducts)
        const newShoppingCart = calculateCart(updatedProducts)
        setShoppingCart(newShoppingCart)
        return updatedProducts
      })
    } else {
      const response = await fetch(`${SHOPPING_CART_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`
        }
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const shoppingCartResponse = await response.json()
      setShoppingCart(shoppingCartResponse)
      setShoppingCartProducts(shoppingCartResponse.items)
    }
  }

  const emptyShoppingCart = async () => {
    if (!user) {
      setUserCartProductsToLocalStorage([])
      setUserCartToLocalStorage([])
      setShoppingCart([])
      setShoppingCartProducts([])
    } else {
      const response = await fetch(`${SHOPPING_CART_URL}/empty-car`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`
        }
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const shoppingCartResponse = await response.json()
      setShoppingCart(shoppingCartResponse)
      setShoppingCartProducts(shoppingCartResponse.items)
    }
  }

  return (
    <ShoppingCartContext.Provider value={{
      shoppingCart,
      shoppingCartProducts,
      getUserShoppingCartByUserId,
      handleAddProductToCart,
      addProductToCart,
      handleProductQuantity,
      removeProductFromCartByProductId,
      emptyShoppingCart
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
