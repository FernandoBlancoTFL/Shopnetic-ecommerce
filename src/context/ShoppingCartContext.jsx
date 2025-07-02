import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider ({ children }) {
  const [shoppingCart, setShoppingCart] = useState(() => {
    const cartFromLocalStorage = window.localStorage.getItem('shoppingCart')
    return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []
  })
  const [clickedIds, setClickedIds] = useState(() => {
    const clickedIds = window.localStorage.getItem('clickedIds')
    return clickedIds ? JSON.parse(clickedIds) : []
  })
  const totalPrice = Number(shoppingCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2))

  useEffect(() => {
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
  }, [shoppingCart])

  useEffect(() => {
    window.localStorage.setItem('clickedIds', JSON.stringify(clickedIds))
  }, [clickedIds])

  const getOrInitializeProductInCart = (product) => {
    if ('quantity' in product) {
      return product
    }

    const existingProduct = shoppingCart.find(item => item.id === product.id)

    if (existingProduct) {
      return existingProduct
    }

    return { ...product, quantity: 1 }
  }

  const addProductToCart = (product) => {
    const productWithQuantity = getOrInitializeProductInCart(product)

    setShoppingCart(prevCart => {
      const exists = prevCart.some(item => item.id === product.id)
      if (exists) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, productWithQuantity]
    })
  }

  const handleClickedIds = (productId) => {
    setClickedIds([...clickedIds, productId])
  }

  const handleAddProductToCart = (product, shouldShowAlert = true) => {
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
    handleClickedIds(product.id)
    addProductToCart(product)
  }

  const emptyShoppingCart = () => {
    setShoppingCart([])
    setClickedIds([])
  }

  const reduceProductFromCartById = productId => {
    setShoppingCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === productId)
      if (existingIndex !== -1) {
        const newCart = [...prevCart]
        if (newCart[existingIndex].quantity > 1) {
          newCart[existingIndex].quantity -= 1
          return newCart
        } else {
          setClickedIds(prevIds => prevIds.filter(id => id !== productId))
          return newCart.filter(item => item.id !== productId)
        }
      }
      return prevCart
    })
  }

  const removeProductFromCartById = productId => {
    setShoppingCart(prevCart => prevCart.filter(item => item.id !== productId))
    setClickedIds(prevIds => prevIds.filter(id => id !== productId))
  }

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, totalPrice, addProductToCart, handleAddProductToCart, getOrInitializeProductInCart, removeProductFromCartById, reduceProductFromCartById, emptyShoppingCart, clickedIds, handleClickedIds }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
