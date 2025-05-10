import { Products } from '../components/ListProducts'
import { ShoppingCart } from '../components/ShoppingCart'
import { useState, useEffect } from 'react'

export function Home ({ filterURL, filterName }) {
  const [shoppingCart, setShoppingCart] = useState(() => {
    const cartFromLocalStorage = window.localStorage.getItem('shoppingCart')
    return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []
  })
  const [clickedIds, setClickedIds] = useState(() => {
    const clickedIds = window.localStorage.getItem('clickedIds')
    return clickedIds ? JSON.parse(clickedIds) : []
  })

  useEffect(() => {
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
  }, [shoppingCart])

  useEffect(() => {
    window.localStorage.setItem('clickedIds', JSON.stringify(clickedIds))
  }, [clickedIds])

  const handleClick = (product) => {
    setShoppingCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id)

      if (existingIndex !== -1) {
        const newCart = [...prevCart]
        newCart[existingIndex].quantity += 1
        return newCart
      }

      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const emptyCart = () => {
    setShoppingCart([])
    setClickedIds([])
  }

  const handleIds = (productId) => {
    setClickedIds([...clickedIds, productId])
  }

  const handleRemoveProduct = productId => {
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

  return (
    <main className='flex-grow-1 bg-secondary text-white'>
      <section className='d-flex flex-column justify-content-center w-50 mx-auto p-2 mt-3 mb-3'>
        <h2 className='mb-4'>{filterName}</h2>
        <ShoppingCart cartItems={shoppingCart} emptyShoppingCart={emptyCart} removeProductFromCart={handleRemoveProduct} addProductToCart={handleClick} />
        <Products filterURL={filterURL} handleClick={handleClick} handleIds={handleIds} clickedIds={clickedIds} />
      </section>
    </main>
  )
}
